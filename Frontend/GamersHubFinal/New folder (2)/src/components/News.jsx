import { useEffect, useState } from "react";
import axios from "axios";
import '../styles/news.css';
import Header from "../components/Header.jsx";

export default function News() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `https://newsapi.org/v2/everything?domains=pcgamer.com&from=2024-08-20&sortBy=publishedAt&apiKey=8b8e8b1053c04a6481d7b22054713ca8`
                );
                // console.log(res.data.articles);
                setData(res.data.articles);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <Header/>
        <div className="cards-container">

        <div className="cards">
            {
                data.map((item, idx) => (
                    <div key={idx} className="card">
            <div className="infos">
            <div className="image">
                <img src={item.urlToImage} alt="" />
            </div>
            <div className="info-container">
                <h3 className="title">{item.title}</h3>
                <p className="des">{item.description}</p>
                <div className="general">
                <p className="author">{item.author}</p>
                <p className="date">{item.publishedAt.slice(0, 10)}</p>
                <a href={item.url}>Read More</a>
                </div>
                </div>
            </div>
        </div>
                ))
            }
            </div>
        </div>
        {/* <Footer/> */}
        </>
    );
}
