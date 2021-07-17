import { RequestHandler } from "express";

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
export const list: RequestHandler = async (req, res, next) => {
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
export const register: RequestHandler = async (req, res, next) => {
    const newWebhook: registerData = { ...req.body }
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
export const update: RequestHandler = async (req, res, next) => {
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
export const deleteHook: RequestHandler = async (req, res, next) => {
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
export const trigger: RequestHandler = async (req, res, next) => {
    const ipAddress: String = req.body
    try {
        const { data } = await axios.post(`${process.env.WEBHOOK_URL}/ip`, ipAddress)
        res.status(200).send(data)
    } catch (e) {
        res.status(400).send(e)
    }
}