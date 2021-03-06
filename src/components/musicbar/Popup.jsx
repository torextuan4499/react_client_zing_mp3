import { useContext, useRef, useState, useEffect } from "react";

import { CurrentSongContext } from "../../contextProviders/CurrentSongProvider";
import { PlayingContext } from "../../contextProviders/PlayingProvider";
import MusicbarInfo from "./MusicbarInfo";
import MusicbarTools from "./MusicbarTools";
import MusicbarCustomSong from "./musicbarCustom/MusicbarCustomSong";
import MusicbarCustomTime from "./musicbarCustom/MusicbarCustomTime";

const Popup = (props) => {

    const { popup, handlePopup } = props
    const [playing] = useContext(PlayingContext)
    const currentSong = useContext(CurrentSongContext)
    const [duration, setDuration] = useState(0)


    const audioRef = useRef()

    const handleLoadata = () => {
        setDuration(audioRef.current.duration)
        if(playing) audioRef.current.play()
    }
    
    useEffect(() => {
        if(playing) {
            audioRef.current.play()
        }else {
            audioRef.current.pause()
        }
    }, [playing])

  return (
    <div className={`popup ${popup}`}>
        <div className="popup_wrapper">
            <div className="popup_logo">
                <img src="./images/image-slide/main-logo.svg" alt="" className="popup_logo_image hide-on-tablet hide-on-mobile"/>
                <img src="./images/image-slide/small-logo.svg" alt="" className="popup_small_logo_image hide-on-computer display-on-tablet display-on-mobile"/>
            </div>
            <div className="popup_middle">
                <div className="popup_middle_nav">
                    <p className="popup_middle_nav_item active">
                        DANH SÁCH PHÁT
                    </p>
                    <p className="popup_middle_nav_item">
                        KARAOKE
                    </p>
                    <p className="popup_middle_nav_item hide-on-mobile">
                        LỜI BÀI HÁT
                    </p>
                </div>
                <div className="popup_middle_song">
                    <div className="popup_middle_song_disk">
                        <div className={`popup_middle_song_disk_image${playing ? ' playing' : ''}`} style={{background: `url(${currentSong.thumnail}) center center / cover no-repeat`}}></div>
                    </div>
                    <p className="popup_middle_song_name">
                        {currentSong.name}
                    </p>
                    <p className="popup_middle_song_artists">
                        {currentSong.singers}
                    </p>
                </div>
            </div>
            <div className="popup_options">
                <p className="popup_options_icon hide-on-mobile hide-on-tablet">
                    <i className="bi bi-arrows-angle-expand"></i>
                </p>
                <p className="popup_options_icon hide-on-mobile hide-on-tablet">
                    <i className="bi bi-gear"></i>
                </p>
                <p className="popup_options_icon popup_down_btn" onClick={() => handlePopup('down')}>
                    <i className="bi bi-chevron-down"></i>
                </p>
            </div>
            <div className="musicbar popup_musicbar">
                <MusicbarInfo hideOnMobile={'hide-on-mobile'} />
                <div className="musicbar_custom">
                    <MusicbarCustomTime audioRef={audioRef} duration={duration}/>
                    <MusicbarCustomSong />
                </div>
                <MusicbarTools />
            </div>
        </div>
        <audio 
            ref={audioRef} 
            src={currentSong.link} 
            className="song_audio"
            onLoadedData={handleLoadata}
        ></audio>
    </div>
  );
};

export default Popup;
