import React from 'react';

class Header extends React.Component {
    callApi(){
        // Github fetch library : https://github.com/github/fetch
        // Call the API page
        fetch('/ok')
            .then((result) => {
                // Get the result
                // If we want text, call result.text()
                return result;
            }).then((jsonResult) => {
            // Do something with the result
            console.log(jsonResult);
        })
    }

    render() {
        return <header className="header">
                    <div>
                        <button onClick={() => this.callApi()}>
                            Click here to call API
                        </button>
                    </div>
                </header>;
    }
}

export default Header;