const mongoose = require('mongoose')

const ThoughtSchema = mongoose.Schema( {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    keywords: {
        type: String, //array of strings
        required: false
    },
    date: {
        type: String,
        default: Date.now,
    },
    author: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: false
    },
    location: {
        type: String, //geolocation?
        required: false
    },
    relatedAuthors: {
        type: String, //array of strings
        required: false
    },
    citations: {
        type: String, //array of strings
        required: false
    },
})

module.exports = mongoose.model('Thought', ThoughtSchema)