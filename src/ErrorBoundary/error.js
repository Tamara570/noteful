import React, { Component } from 'react'


class ErrorBoundary extends Component {

    state={hasError:false}

    static getDerivedStateFromError(error) {
        console.error(error)
        return { hasError: true }
    }


    render() {
        return (

            <div>
                { this.state.hasError ? <p className='red'>There was an error!</p> : this.props.children}
            </div>
        )
    }
    
}

export default ErrorBoundary 