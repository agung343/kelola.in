export function RupiahFormat(value: number) {
    return Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(value)
}

export function DateFormat(value: Date | string):string {
    const d = typeof value === "string" ?  new Date(value) : value

    return Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(d)
}