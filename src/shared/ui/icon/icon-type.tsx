import {getKey} from "shared/lib";
import {ReactComponent as Send} from 'shared/assets/icons/message_.svg';
import {ReactComponent as Emoji} from 'shared/assets/icons/emoji_icon_.svg';
import {ReactComponent as Attach} from 'shared/assets/icons/paper-clip_icon_.svg';
import {ReactComponent as Microphone} from 'shared/assets/icons/microphone_.svg';
import {ReactComponent as MessageStatus} from 'shared/assets/icons/double-check_icon_.svg';
import {ReactComponent as EyeOn} from 'shared/assets/icons/eye-open_.svg';
import {ReactComponent as EyeOff} from 'shared/assets/icons/eye-close_.svg';
import {ReactComponent as Envelope} from 'shared/assets/icons/email_envelope_.svg';
import {ReactComponent as Lock} from 'shared/assets/icons/lock-line_.svg';
import {ReactComponent as User} from 'shared/assets/icons/profile_.svg';
import {ReactComponent as Search} from 'shared/assets/icons/search_.svg';
import {ReactComponent as Hamburger} from 'shared/assets/icons/menu-hamburger_.svg';
import {ReactComponent as ClearInput} from 'shared/assets/icons/close-circle_.svg';
import {ReactComponent as Logout} from 'shared/assets/icons/logout_.svg';
import {ReactComponent as Moon} from 'shared/assets/icons/moon_.svg';
import {ReactComponent as Profile} from 'shared/assets/icons/profile_.svg';
import {ReactComponent as Warning} from 'shared/assets/icons/warning_.svg';
import {ReactComponent as Settings} from 'shared/assets/icons/setting_.svg';


export type IconType =
    | 'send'
    | 'emoji'
    | 'attach'
    | 'microphone'
    | 'msg-status'
    | 'eye-on'
    | 'eye-off'
    | 'envelope'
    | 'lock'
    | 'user'
    | 'search'
    | 'hamburger'
    | 'clear'
    | 'logout'
    | 'moon'
    | 'profile'
    | 'warning'
    | 'settings'

export const iconTypes = new Map([
  ['send', <Send key={getKey()}/>],
  ['emoji', <Emoji key={getKey()}/>],
  ['attach', <Attach key={getKey()}/>],
  ['microphone', <Microphone key={getKey()}/>],
  ['msg-status', <MessageStatus key={getKey()}/>],
  ['eye-on', <EyeOn key={getKey()}/>],
  ['eye-off', <EyeOff key={getKey()}/>],
  ['envelope', <Envelope key={getKey()}/>],
  ['lock', <Lock key={getKey()}/>],
  ['user', <User key={getKey()}/>],
  ['search', <Search key={getKey()}/>],
  ['hamburger', <Hamburger key={getKey()}/>],
  ['clear', <ClearInput key={getKey()}/>],
  ['logout', <Logout key={getKey()}/>],
  ['moon', <Moon key={getKey()}/>],
  ['profile', <Profile key={getKey()}/>],
  ['warning', <Warning key={getKey()}/>],
  ['settings', <Settings key={getKey()}/>],
])


