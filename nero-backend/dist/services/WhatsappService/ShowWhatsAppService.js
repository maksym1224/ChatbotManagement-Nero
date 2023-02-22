"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Queue_1 = __importDefault(require("../../models/Queue"));
const QueueOption_1 = __importDefault(require("../../models/QueueOption"));
const ShowWhatsAppService = async (id, companyId, session) => {
    const findOptions = {
        include: [
            {
                model: Queue_1.default,
                as: "queues",
                attributes: ["id", "name", "color", "greetingMessage"],
                include: [{ model: QueueOption_1.default, as: "options" }]
            }
        ],
        order: [["queues", "name", "ASC"]]
    };
    if (session !== undefined && session == 0) {
        findOptions.attributes = { exclude: ["session"] };
    }
    const whatsapp = await Whatsapp_1.default.findByPk(id, findOptions);
    if (whatsapp?.companyId !== companyId) {
        throw new AppError_1.default("Unable to access another company's records");
    }
    if (!whatsapp) {
        throw new AppError_1.default("ERR_NO_WAPP_FOUND", 404);
    }
    return whatsapp;
};
exports.default = ShowWhatsAppService;
