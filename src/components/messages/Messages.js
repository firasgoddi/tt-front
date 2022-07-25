import React, {useContext,useEffect} from 'react';
import { UiContext } from "../../context/UiContext";
import FooterMessagerie from './FooterMessagerie';
import HeaderMessagerie from './HeaderMessagerie';
import MessagesList from './MessagesList';
import MessagesSideBar from './MessagesSideBar';

function Messages(props) {
    const { conversations, showConversation } = useContext(UiContext);
  
        const val = React.useRef();
        React.useEffect(
          () => { props.changeNavbar('/messagerie')
            val.current = props;
          },
          [props]
        );
        React.useEffect(() => {
          return () => {props.changeNavbar(window.location.pathname)};
        }, []);
    return (
        <div className="inbox-page">
            <div className="inbox-page-content">
                <div className="inbox-page-content-main container">
                    <div className="content-inbox">
                        <div className="discussion-left-side">
                            <HeaderMessagerie conversation={conversations[showConversation]} index={showConversation} />
                            <MessagesList conversation={conversations[showConversation]} />
                            <FooterMessagerie conversation={conversations[showConversation]} />
                        </div>
                        <MessagesSideBar conversation={conversations[showConversation]} />
                    </div>
                </div>
            </div>
        </div>
    )
}

Messages.propTypes = { }

export default Messages

