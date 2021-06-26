module.exports = (email) => {
    return `
        <html>
            <body>
                <div style="text-align: left">
                    <h3>This is another trial</h3>
                    <p>Please carefully read the following</p>
                    <p>${email.body}</p>
                    <div>
                        <a href="http://localhost:3000">Click here!</a>
                    </div>
                </div>
            </body>
        </html>
    `;
}