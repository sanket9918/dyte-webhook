import { NextFunction, Request, Response, RequestHandler } from "express";

import axios from "axios";

export interface registerData {
    target: {
        targetURL: String
    }
}
/**
        * List all the webhook targets
        * @returns {Object} targets
        */
async function list(req: Request, res: Response, next: NextFunction) {

    try {
        const { data } = await axios.get(`${process.env.WEBHOOK_URL}/list`)
        res.status(200).send(data)


    } catch (err) {
        res.status(400).send(err)
    }
}

/**
         * Register a targetURL for the webhook
         * @param {Object} target
         * @param {String} targetURl
         * @returns {Object} newly created entity
         */
async function register(req: Request, res: Response, next: NextFunction) {
    const newWebhook = { ...req.body }

    try {
        const { data } = await axios.post(`${process.env.WEBHOOK_URL}/register`, newWebhook)
        res.status(200).send(data)
    } catch (err) {
        res.status(400).send(err)
    }
}
/**
         * Update a targetURL for the webhook
         * @param {Object} target
         * @param {ObjectId} _id
         * @param {ObjectId} newTargetURL
         * @returns {Object} creation status
         */
async function update(req: Request, res: Response, next: NextFunction) {
    const updatedData = { ...req.body }
    try {
        const { data } = await axios.put(`${process.env.WEBHOOK_URL}/update`, updatedData)
        res.status(200).send(data)
    } catch (err) {
        res.status(404).send(err)
    }
}
/**
        * Delete the target of a webhook
        * @param {ObjectId} _id
        * @returns {Object} result
        */
async function deleteHook(req: Request, res: Response, next: NextFunction) {
    const deleteID: String = req.params.id
    try {
        const { data } = await axios.delete(`${process.env.WEBHOOK_URL}/delete/${deleteID}`)
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
}
/**
       * Update a targetURL for the webhook
       * @param {String} ipAdddress
       * @returns {Object} creation status
       */
async function trigger(req: Request, res: Response, next: NextFunction) {
    const ipAddress: String = req.body
    try {
        const { data } = await axios.post(`${process.env.WEBHOOK_URL}/ip`, ipAddress)
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
}
module.exports = { list, register, update, deleteHook, trigger }