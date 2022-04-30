import React, { Component } from 'react'
// Import centrally managed url paths
import URLS from '@/request/url'
import axios from 'axios'
import { withRouter } from '@/router/withRouter'
import store from '@/redux/store'
import './index.css'

class Upload extends Component {
    state = {
        previewImgSrc: '',
        file: null,
        title: '',
        postContent: '',
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
        this.setState({ file });
        let url = URL.createObjectURL(file);
        this.setState({ previewImgSrc: url });
    }

    setTitle = (val) => {
        this.setState({ title: val });
    }

    setPostContent = (val) => {
        this.setState({ postContent: val });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const requestParams = {
            file: this.state.file,
            title: this.state.title,
            postContent: this.state.postContent,
            account: JSON.parse(localStorage.getItem('Account')).account
        }
        let res = await axios.post(URLS.USER_POST_MESSAGE, requestParams);
        const { imgId } = res.data;
        
        // redirect to the new posted image
        const requestParams2 = {
			imgId: imgId
		};
		let res2 = await axios.post(URLS.IMAGE_DETAIL, requestParams2);
		const { data } = res2;
		store.dispatch({ type: 'imgDetail', data });
		this.props.navigate('/imgDetail');
    }

    render() {
        const { previewImgSrc } = this.state;
        return (
            <div className='container'>
                <form onSubmit = { this.handleSubmit } className="row">
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
                            <input 
                                type="text" 
                                className="form-control" 
                                id="title" 
                                placeholder='Add your title'
                                onChange = { e => this.setTitle(e.target.value) }
                            />
                        </div>
                        <div className="col-md-12">
                            <br />
                            <textarea 
                                type="text" 
                                className="form-control" 
                                rows="5" 
                                placeholder="Write your post..."
                                onChange = { e => this.setPostContent(e.target.value) }
                            />
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

export default withRouter(Upload)