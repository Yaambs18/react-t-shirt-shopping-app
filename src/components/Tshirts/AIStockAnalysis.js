import { GoogleGenAI } from "@google/genai";

import Modal from "../UI/Modal";
import { useEffect, useState } from "react";

import "./AIStockAnalysis.css";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
const stockThreshold = 5;

const AIStockAnalysis = (props) => {

    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        analyzeStock();
    }, []);

    const analyzeStock = async () => {
        const stockAnalysisPrompt = `Analyze the current stock levels of T-shirts and provide recommendations for restocking based on the following criteria:\n
            -Identify sizes that are below the stock threshold of ${stockThreshold} as "Critical to restock".\n
            -Identify sizes that are between ${stockThreshold} and ${stockThreshold+5} as "Consider restocking soon".\n
            -Identify sizes that are above ${stockThreshold+5} as "Sufficient stock".\n
        Provide your analysis in a clear and concise manner.
        Here is the current stock data:\n
        ${JSON.stringify(props.tshirts)}
        Please provide the reponse in a styled and formated html format.No need to return complete HTML page just render the analysis as cards. Use div and p tags only. Add responsive styles to make it look good.`;
    
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: stockAnalysisPrompt,
            });
            console.log("AI Stock Analysis Response: ", response);
            const analysis = response.text;
            const htmlString = response?.text.replace('```html', '').replace('```', '').trim();
            const data = <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
            setHtmlContent(data);
        } catch (error) {
            console.error("Error during AI stock analysis:", error);
        }
    }
    return (
        <Modal onClose={props.onClose}>
            <h2>AI Stock Analysis</h2>
            <div className="ai-stock-analysis-modal">
                {htmlContent}
            </div>
            <div className="actions">
                <button className="button--alt" onClick={props.onClose}>Close</button>
            </div>
        </Modal>
    )
}

export default AIStockAnalysis;