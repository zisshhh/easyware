import { useEffect, useState } from "react"
import axios from "axios"
import { Navbar } from "@/components/Navbaar"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"

type CartItem = {
    _id: string
    quantity: number
    subtotal: number
    productId: {
        _id: string
        name: string
        price: number
        imageURL?: string[] | string
        brand: string
        category: string
    }
}

type CartResponse = {
    items?: CartItem[]
    iterms?: CartItem[] // Handle backend typo
    totalPrice: number
}

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000"

export default function Cart() {
    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [updating, setUpdating] = useState<string | null>(null)

    const fetchCart = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            setError("Please log in to view your cart.")
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)
        try {
            const res = await axios.get<CartResponse>(`${API_BASE}/api/v1/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            // Normalize response - handle backend typo (iterms vs items)
            const items = res.data.items ?? res.data.iterms ?? []
            const normalizedData: CartResponse = {
                items: Array.isArray(items) ? items : [],
                totalPrice: res.data.totalPrice ?? 0
            }
            setCartData(normalizedData)
        } catch (e: any) {
            const status = e?.response?.status
            if (status === 401) {
                setError("Please log in to view your cart.")
            } else {
                setError("Failed to load cart. Try again later.")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleIncrease = async (itemId: string) => {
        const token = localStorage.getItem("token")
        if (!token) return

        setUpdating(itemId)
        try {
            await axios.patch(`${API_BASE}/api/v1/cart/${itemId}/increase`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            await fetchCart()
        } catch (e) {
            console.error("Failed to increase quantity", e)
        } finally {
            setUpdating(null)
        }
    }

    const handleDecrease = async (itemId: string) => {
        const token = localStorage.getItem("token")
        if (!token) return

        setUpdating(itemId)
        try {
            await axios.patch(`${API_BASE}/api/v1/cart/${itemId}/decrease`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            })
            await fetchCart()
        } catch (e) {
            console.error("Failed to decrease quantity", e)
        } finally {
            setUpdating(null)
        }
    }

    const handleRemove = async (itemId: string) => {
        const token = localStorage.getItem("token")
        if (!token) return

        setUpdating(itemId)
        try {
            await axios.delete(`${API_BASE}/api/v1/cart/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            await fetchCart()
        } catch (e) {
            console.error("Failed to remove item", e)
        } finally {
            setUpdating(null)
        }
    }

    const handleClearCart = async () => {
        const token = localStorage.getItem("token")
        if (!token) return

        if (!confirm("Are you sure you want to clear your cart?")) return

        setUpdating("clear")
        try {
            await axios.delete(`${API_BASE}/api/v1/cart`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            await fetchCart()
        } catch (e) {
            console.error("Failed to clear cart", e)
        } finally {
            setUpdating(null)
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="border-b bg-card/50">
                <div className="container mx-auto px-4 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-semibold">Shopping Cart</h1>
                            <p className="text-muted-foreground mt-1">Review and manage your items.</p>
                        </div>
                        {cartData && cartData.items && cartData.items.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={handleClearCart}
                                disabled={updating === "clear"}
                            >
                                {updating === "clear" ? "Clearing..." : "Clear Cart"}
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            <section>
                <div className="container mx-auto px-4 py-8">
                    {loading ? (
                        <div className="grid place-items-center py-16 text-muted-foreground">
                            Loading cart…
                        </div>
                    ) : error ? (
                        <div className="grid place-items-center py-16">
                            <div className="text-center space-y-3">
                                <p className="text-sm text-muted-foreground">{error}</p>
                                <Button onClick={() => fetchCart()}>Retry</Button>
                            </div>
                        </div>
                    ) : !cartData || !cartData.items || cartData.items.length === 0 ? (
                        <div className="grid place-items-center py-16">
                            <div className="text-center space-y-4">
                                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground" />
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                                    <p className="text-muted-foreground mb-4">Start adding items to your cart!</p>
                                    <Button asChild>
                                        <a href="/products">Browse Products</a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartData.items && cartData.items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="rounded-lg border bg-card p-4 md:p-6 transition-all hover:shadow-sm"
                                    >
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="relative aspect-square w-full sm:w-32 shrink-0 rounded-lg overflow-hidden bg-secondary/60">
                                                {(() => {
                                                    const imageURL = item.productId.imageURL
                                                    const imageSrc = Array.isArray(imageURL) 
                                                        ? imageURL[0] 
                                                        : typeof imageURL === 'string' 
                                                        ? imageURL 
                                                        : null
                                                    return imageSrc ? (
                                                        <img
                                                            src={imageSrc}
                                                            alt={item.productId.name}
                                                            className="absolute inset-0 w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                                            No Image
                                                        </div>
                                                    )
                                                })()}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 space-y-3">
                                                <div>
                                                    <h3 className="text-lg font-semibold line-clamp-2">
                                                        {item.productId.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.productId.brand} · {item.productId.category}
                                                    </p>
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-sm text-muted-foreground">Quantity:</span>
                                                        <div className="flex items-center gap-2 border rounded-md">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => handleDecrease(item._id)}
                                                                disabled={updating === item._id}
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </Button>
                                                            <span className="w-12 text-center font-medium">
                                                                {item.quantity}
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                                onClick={() => handleIncrease(item._id)}
                                                                disabled={updating === item._id}
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    {/* Price and Remove */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-sm text-muted-foreground">Subtotal</p>
                                                            <p className="text-lg font-semibold">
                                                                ₹ {item.subtotal.toFixed(2)}
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleRemove(item._id)}
                                                            disabled={updating === item._id}
                                                            className="text-destructive hover:text-destructive"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="rounded-lg border bg-card p-6 sticky top-4">
                                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Items</span>
                                            <span>{cartData.items?.length ?? 0}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>₹ {cartData.totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between">
                                                <span className="font-semibold">Total</span>
                                                <span className="text-xl font-bold">
                                                    ₹ {cartData.totalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full" size="lg">
                                        Proceed to Checkout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}

