export default function Newscard(image, title, description, author, date) {
    return(
        <div className="card">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="info-container">
                <h1 className="title">{title}</h1>
                <p className="des">{description}</p>
                <div className="general">
                <p className="author">{author}</p>
                <p className="date">{date}</p>
                </div>
            </div>
        </div>
    );
}