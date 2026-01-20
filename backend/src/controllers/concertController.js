const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const logger = require("../config/logger")
const { SINGLE_CONVERT_ID } = require("../config/constants")


const getConcertCtrl = async (req, res) => {
    try {
        const concert = await prisma.concert.findUnique({
            where: { id: SINGLE_CONVERT_ID },
            include: { category: true }
        })
        if (!concert) {
            return res.status(404).json({ message: "Concert not found" })
        }
        res.status(200).json({ concert })
    } catch (error) {
        logger.error("Error in getConcertCtrl:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getConcertCtrl,
}