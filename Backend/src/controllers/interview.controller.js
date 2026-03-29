const { PDFParse } = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

const normalizeText = (value) => (typeof value === "string" ? value.trim() : "")

async function extractResumeTextFromPdfBuffer(fileBuffer) {
    const parser = new PDFParse({ data: fileBuffer })

    try {
        const parsedPdf = await parser.getText()
        return normalizeText(parsedPdf?.text)
    } finally {
        await parser.destroy()
    }
}




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body
        const normalizedSelfDescription = normalizeText(selfDescription)
        const normalizedJobDescription = normalizeText(jobDescription)

        if (!normalizedJobDescription) {
            return res.status(400).json({
                message: "Job description is required."
            })
        }

        let resumeText = ""

        if (req.file) {
            if (req.file.mimetype !== "application/pdf") {
                return res.status(400).json({
                    message: "Only PDF resume files are supported."
                })
            }

            try {
                resumeText = await extractResumeTextFromPdfBuffer(req.file.buffer)
            } catch (error) {
                return res.status(400).json({
                    message: "Unable to read the uploaded PDF. Please upload a valid PDF file."
                })
            }
        }

        if (!resumeText && !normalizedSelfDescription) {
            return res.status(400).json({
                message: "Please upload a resume PDF or provide a self description."
            })
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription: normalizedSelfDescription,
            jobDescription: normalizedJobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription: normalizedSelfDescription,
            jobDescription: normalizedJobDescription,
            ...interViewReportByAi
        })

        res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("Failed to generate interview report:", error)
        return res.status(500).json({
            message: "Unable to generate interview report right now. Please try again."
        })
    }

}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (error) {
        console.error("Failed to fetch interview report:", error)
        return res.status(500).json({
            message: "Unable to fetch interview report right now. Please try again."
        })
    }
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (error) {
        console.error("Failed to fetch interview reports:", error)
        return res.status(500).json({
            message: "Unable to fetch interview reports right now. Please try again."
        })
    }
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)
    } catch (error) {
        console.error("Failed to generate resume PDF:", error)
        return res.status(500).json({
            message: "Unable to generate resume PDF right now. Please try again."
        })
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }
