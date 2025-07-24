interface headingProps {
    lable: string
}

export const Heading = ({lable}: headingProps) => {
    return <div className="font-bold text-4xl pt-6">
        {lable}
    </div>
}