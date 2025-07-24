interface lableProp {
    lable: string
}

export const SubHeading = ({lable}: lableProp) => {
    return <div className="text-slate-500 text-md pt-4 px-4 py-3">
        {lable}
    </div>
}