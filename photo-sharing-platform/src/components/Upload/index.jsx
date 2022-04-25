import React, { Component } from 'react'
import './index.css'

export default class Upload extends Component {
    state = {
        previewImgSrc: '',
    }

    // change upload button
    upload = () => {
        const uploadBtn = document.getElementById('uploadFileInput');
        uploadBtn.click();
    }

    // get url of uploaded image
    getObjectURL = (file) => {
        let url = null;
        if (window.createObjectURL !== undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL !== undefined) { // mozila(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    // set preview image
    changeValue = (e) => {
        var file = e.target.files[0];
        let url = URL.createObjectURL(file);
        this.setState({ previewImgSrc: url })
    }

    render() {
        const { previewImgSrc } = this.state;
        return (
            <div className='container'>
                <form action="/post/find" method="POST" className="row">
                    <div className="col-md-7 uploadLeft">
                        <div className='uploadLeftBox'>
                            <div className='uploadLeftBoxInner' onClick={ this.upload }>
                                <div className="uploadIconBox">
                                    <i className="fas fa-regular fa-plus"></i>
                                    <br />
                                    <p>Click to upload</p>
                                </div>
                                <input 
                                    type="file" 
                                    id="uploadFileInput" 
                                    name="file" 
                                    onChange={ this.changeValue }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="col-md-12">
                            <div className="previewImageBox">
                                <img src={ previewImgSrc } alt="img"/>
                            </div>
                        </div>
                        <div className="col-md-12 input-group-lg">
                            <br />
                            <input type="text" className="form-control" id="name" name="name" placeholder='Add your title'/>
                        </div>
                        <div className="col-md-12">
                            <br />
                            <textarea type="text" className="form-control" name="postContent" rows="5" placeholder="Write your post..."></textarea>
                        </div>
                        <div className="col-md-12">
                            <br />
                            <button type="submit" className="postBtn btn btn-danger">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
