import '../styles/footer.css'
export default function Footer() {
    return(
        <div className="footer-container">

        <div className="footer">
            <div className="references">
                <h2>References</h2>
                <p><a href="" style={{color: 'aqua'}}>Steam</a></p>
                <p><a href="" style={{color: 'aquamarine'}}>Epic Game Launcher</a></p>
                <p><a href="" style={{color: 'orange'}}>RockStar Games</a></p>
                <p><a href="" style={{color: 'violet'}}>GOG</a></p>
            </div>
            <div className="guidelines">
                <h2>Guidelines</h2>
                <p>Contact</p>
                <p>Careers</p>
                <p>Community Guidelines</p>
                <p>Subscribe</p>
            </div>
            <div className="countries">
                <p>India</p>
                <p>USA</p>
                <p>Australia</p>
                <p>North Korea</p>
                <p>Pakistan</p>
            </div>
            </div>
            <h4>&copy; Copyright Gaming Hub. All rights reserved under the Copyright Act 1976</h4>
        </div>
    );
}