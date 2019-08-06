import * as React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
  // VKShareButton,
  // OKShareButton,
  // RedditShareButton,
  // TumblrShareButton,
  // LivejournalShareButton,
  // MailruShareButton,
  // ViberShareButton,
  // WorkplaceShareButton,
  // LineShareButton,
  // PocketShareButton,
  // InstapaperShareButton,
  // EmailShareButton,
} from 'react-share';
import './index.scss';

class SharePage extends React.Component<any> {
  static defaultProps = {
    visible: false,
  }
  constructor(props: any) {
    super(props);
    this.state = {

    }
  }
  render() {
    const url = 'https://www.baidu.com'
    return (
      <div className="SharePage">
        <h2>分享</h2>
        <div>js: yarn add react-share</div>
        <div>typescript: yarn add @type/react-share</div>
        <div>react-share => </div>
        <div className="share">
          <FacebookShareButton url={url} >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={url} >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={url} >
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <TelegramShareButton url={url} >
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <PinterestShareButton url={url} media={'../../../static/icon_animate.png'}>
            <PinterestIcon size={32} round={true} />
          </PinterestShareButton>
          <WhatsappShareButton url={url} >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <div>....</div>
        </div>
      </div>
    );
  }
}

export default SharePage;
