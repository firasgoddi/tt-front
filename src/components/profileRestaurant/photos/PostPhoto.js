import React, {useState} from 'react';
import { Button, Card, Collapse } from "@material-ui/core";

function PostPhoto(props) {
    const {classes} = props;
    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="tab-one collapsed">
            <div button onClick={handleOpen} className="tab-one-header">
                <span className="post-picture">
                    Postez photos ou Déposer directement ici !
                </span>
                <input
                    type="text"
                    placeholder="Dites quelques choses !"
                    className="input-post"
                />
                <i className="icon-camera" />
            </div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Card style={{ padding: 10 }} className="tab-one-body">
                    <div id="dropzone">
                        <span className="here">Uploader vos photos</span>
                    </div>
                    <div className="tab-one-bottom">
                        <Button className="upload-now">Postez</Button>
                    </div>
                </Card>
            </Collapse>
        </div>
    )
}

PostPhoto.propTypes = {

}

export default PostPhoto
