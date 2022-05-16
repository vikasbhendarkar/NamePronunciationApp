import React from 'react'
import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import {Icon, IconButton} from '@mui/material'
import {Recorder} from 'react-voice-recorder'
import { useDispatch, useSelector } from 'react-redux'
import 'react-voice-recorder/dist/index.css'
import { updateEmployeeRecording } from '../../../redux/actions/EmployeeActions'
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import UploadIcon from '@mui/icons-material/Upload'
import ReactPlayer from 'react-player'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const convertDataURIToBinary = (dataURI) => {
    var BASE64_MARKER = ';base64,';
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}

const PronounciationTool = (props) => {
    const [open, setOpen] = React.useState(false)
    const [play, setPlay] = React.useState({play: false, url: null, data: null})
    const [upload, setUpload] = React.useState(false)
    const [audio, setAudio] = React.useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {
            h: null,
            m: null,
            s: null
        }
    })
    const dispatch = useDispatch()

    const handleRecordDialog = () => {
        setOpen(true)
    }

    const handlePlay = () => {
        const binary = convertDataURIToBinary(props.data.pronounciation)
        const audio = new Blob([binary], {type: 'audio/webm'})
        const url = URL.createObjectURL(audio)
        setPlay({...play,
            play: true,
            url: url
        })

    }
    const handlePlayStop = () => {
        setPlay({...play, play: false})
    }

    const handleUploadAudio = () => {
        setUpload(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleAudioStop = (data) => 
    {
        setAudio(data)
    }
    
    const handleAudioUpload = (file) => {
        dispatch(updateEmployeeRecording(props.eid, file))
    }
    const handleReset = () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: null,
                m: null,
                s: null
            }
        }
        setAudio(reset);
    }

    return (
        <div>
            <IconButton onClick={handleRecordDialog}>
                <Icon style={{color:'red'}}><SettingsVoiceIcon /></Icon>
            </IconButton>
            {
                (props.data.pronounciation!=="") ? (
                    <IconButton onClick={handlePlay}>
                        <Icon color='primary'><VolumeUpIcon /></Icon>
                    </IconButton>
                ):(
                    <IconButton onClick={handlePlay} disabled={true}>
                        <Icon color='default'><VolumeUpIcon /></Icon>
                    </IconButton>
                )
            }
            <ReactPlayer url={play.url} playing={play.play} style={{display:'none'}}/>
            
            <IconButton onClick={handleUploadAudio}>
                <Icon style={{color:'green'}}><UploadIcon /></Icon>
            </IconButton>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
            >
                
                <Recorder
                    record={true}
                    title={"New recording"}
                    audioURL={audio.url}
                    showUIAudio
                    handleAudioStop={data => handleAudioStop(data)}
                    handleAudioUpload={data => handleAudioUpload(data)}
                    handleReset={() => handleReset()}
                    mimeTypeToUseWhenRecording={`audio/webm`}
                />
            </Dialog>
                
        </div>
    )
}

export default PronounciationTool