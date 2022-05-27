import React from 'react'
import './index.css'

const SocialContact = () => {
    return (
        <div class="social-button">
            <div class="social-button-content">
                <a href="tel:0981481368" class="call-icon" rel="nofollow">
                    <i class="fa fa-whatsapp" aria-hidden="true"></i>
                    <div class="animated alo-circle"></div>
                    <div class="animated alo-circle-fill  "></div>
                    <span>Hotline: 098 148 1368</span>
                </a>
                <a href="sms:0981481368" class="sms">
                    <i class="fa fa-weixin" aria-hidden="true"></i>
                    <span>SMS: 098 148 1368</span>
                </a>
                <a href="https://www.facebook.com/Ngocthang.net/" class="mes">
                    <i class="fa fa-facebook-square" aria-hidden="true"></i>
                    <span>Nhắn tin Facebook</span>
                </a>
                <a href="http://zalo.me/0981481368" class="zalo">
                    <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    <span>Zalo: 098.148.1368</span>
                </a>
            </div>

            <a class="user-support">
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                <div class="animated alo-circle"></div>
                <div class="animated alo-circle-fill"></div>
            </a>
        </div>
    )
}

export default SocialContact