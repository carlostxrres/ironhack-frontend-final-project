export const getDisplayDate = (date) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
};

export const getTimeAgo = (timestamp) => {
    const numericTime = new Date(timestamp).getTime()
    if (isNaN(numericTime)) {
        throw new Error("Invalid timestamp")
    }
    const MILLISECONDS_BY_TIME_UNIT = [
        ["year", 31_536_000_000],
        ["month", 2_628_000_000],
        ["week", 604_800_000],
        ["day", 86_400_000],
        ["hour", 3_600_000],
        ["minute", 60_000],
        ["second", 1_000],
    ]

    const displayUnits = []
    let elapsed = Date.now() - numericTime
    for (let [unit, milliseconds] of MILLISECONDS_BY_TIME_UNIT) {
        if (displayUnits.length >= 2) {
            break
        }

        const amount = Math.floor(elapsed / milliseconds)
        if (amount < 1) {
            continue
        }

        displayUnits.push([unit, amount])
        elapsed -= amount * milliseconds
    }

    if (displayUnits.length === 0) {
        return `less than a ${MILLISECONDS_BY_TIME_UNIT[-1][0]} ago`
    }

    const pl = (quantity, noun) => `${noun}${quantity === 1 ? "" : "s"}`
    const displayTexts = displayUnits.map(([unit, amount]) => `${amount} ${pl(amount, unit)}`)
    return `${displayTexts.join(" and ")} ago`
}