import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Navbar } from "@/components/Navbaar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Product = {
    _id: string
    name: string
    price: number
    brand: string
    description: string
    category: string
    imageURL: string[]
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

export default function Products() {
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [query, setQuery] = useState("")
    const [addingToCart, setAddingToCart] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        setLoading(true)
        setError(null)
        axios
            .get(`${API_BASE}/api/v1/products`, {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            })
            .then((res) => {
                const items: Product[] = res.data?.allProducts ?? []
                setProducts(items)
            })
            .catch((e) => {
                const status = e?.response?.status
                if (status === 401) {
                    setError("Please log in to view products.")
                } else {
                    setError("Failed to load products. Try again later.")
                }
            })
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return products
        return products.filter((p) =>
            [p.name, p.brand, p.category].some((s) => s?.toLowerCase().includes(q))
        )
    }, [products, query])

    const handleAddToCart = async (productId: string) => {
        const token = localStorage.getItem("token")
        if (!token) {
            // Redirect to login if not authenticated
            navigate("/login")
            return
        }

        setAddingToCart(productId)
        try {
            await axios.post(
                `${API_BASE}/api/v1/cart`,
                {
                    productId,
                    quantity: 1
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            // Success - you could add a toast notification here
        } catch (e: any) {
            const status = e?.response?.status
            if (status === 401) {
                // Token expired or invalid
                localStorage.removeItem("token")
                navigate("/login")
            } else {
                console.error("Failed to add to cart", e)
                // You could show an error toast here
            }
        } finally {
            setAddingToCart(null)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="border-b bg-card/50">
                <div className="container mx-auto px-4 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold">Products</h1>
                            <p className="text-muted-foreground mt-1">Browse our latest inventory.</p>
                        </div>
                        <div className="w-full md:w-80">
                            <Input
                                placeholder="Search by name, brand, or category"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="h-10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mx-auto px-4 py-8">
                    {loading ? (
                        <div className="grid place-items-center py-16 text-muted-foreground">Loading products…</div>
                    ) : error ? (
                        <div className="grid place-items-center py-16">
                            <div className="text-center space-y-3">
                                <p className="text-sm text-muted-foreground">{error}</p>
                                <Button onClick={() => window.location.reload()}>Retry</Button>
                            </div>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="grid place-items-center py-16 text-muted-foreground">No products found.</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {filtered.map((p) => (
                                <div key={p._id} className="rounded-lg border overflow-hidden bg-card transition-all hover:shadow-sm">
                                    <div className="relative aspect-4/3 w-full bg-secondary/60 overflow-hidden">
                                        {p.imageURL?.[0] ? (
                                            <img
                                                src={p.imageURL[0]}
                                                alt={p.name}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : null}
                                    </div>
                                    <div className="p-3 md:p-4 space-y-1.5">
                                        <h3 className="text-sm md:text-base font-medium line-clamp-1">{p.name}</h3>
                                        <p className="text-muted-foreground text-xs md:text-sm line-clamp-1">{p.brand} · {p.category}</p>
                                        <div className="flex items-center justify-between pt-1.5">
                                            <span className="font-semibold">₹ {p.price.toFixed(2)}</span>
                                            <Button
                                                size="sm"
                                                onClick={() => handleAddToCart(p._id)}
                                                disabled={addingToCart === p._id}
                                            >
                                                {addingToCart === p._id ? "Adding..." : "Add to cart"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}


