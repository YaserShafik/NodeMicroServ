import OpenAI from "openai";

const set_Openai = (req, res, next) => {
    try {
        const openai = new OpenAI({
            organization: "org-wsDmnmvxnhIQGdWurbIVTffZ", //poner claves y org id
            project: "proj_1OJnYDRlFVAg0DZNjY3QuTXE",
        });
    
        req.openain = openai;
        next()
    } catch (error) {
        console.error("error configuring openai:", error);
        res.status(500).send("Internal sever error")
        
    }
}

module.exports = set_Openai
