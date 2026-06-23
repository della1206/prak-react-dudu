export function getTierByPoints(points = 0) {
    if (points >= 1000) return "platinum"
    if (points >= 500) return "gold"
    if (points >= 100) return "silver"
    return "bronze"
}

export function getDiscountRate(tier = "bronze") {
    const rates = {
        bronze: 0.05,
        silver: 0.1,
        gold: 0.15,
        platinum: 0.2,
    }

    return rates[tier] || rates.bronze
}

export function getPointsFromTotal(totalFinal = 0) {
    return Math.floor(Number(totalFinal) / 10000)
}
