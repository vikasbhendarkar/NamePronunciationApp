import React from 'react'
import {Grid, Paper} from '@mui/material'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice'
import {Recorder} from 'react-voice-recorder'
import {Icon, IconButton, Dialog} from '@mui/material'
import "react-voice-recorder/dist/index.css";
import ReactPlayer from 'react-player'
import axios from 'axios'

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

const PronounciationWidget = (props) => {

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

    const handlePlay = () => {
        if(props.data.pronounciation.length === 0) {
            // handle text-to-speech

        }
        else {
            const binary = convertDataURIToBinary(props.data.pronounciation)
            const audio = new Blob([binary], {type: 'audio/webm'})
            const url = URL.createObjectURL(audio)
            setPlay({...play,
                play: true,
                url: url
            })
        }
        
    }
    const handleRecordDialog = () => {
        setOpen(true)
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
        //dispatch(updateEmployeeRecording(props.eid, file))
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
        <>
            <Paper elevation={3} style={{marginTop:100, width: 400, padding:10, display:'flex', alignItems:'center', alignContent:'center', alignSelf:'center', height:'100%' }}>
            <Grid container spacing={2} style={{display: 'flex'}}>
                <Grid item style={{alignItems:'center', display:'flex'}}>
                    {props.data.fname} {props.data.lname}
                </Grid>
                <Grid item style={{alignItems: 'center', display:'flex'}}>
                    {(props.data.status!=="pending") ? (
                            <IconButton onClick={handlePlay}>
                                <Icon color='primary'><VolumeUpIcon /></Icon>
                            </IconButton>
                        ):(
                            <IconButton onClick={handlePlay} disabled={true}>
                                <Icon color='default'><VolumeUpIcon /></Icon>
                            </IconButton>
                        )}
                    <ReactPlayer url={play.url} playing={play.play} style={{display:'none'}}/>

                </Grid>
                <Grid item style={{alignItems: 'center', display: 'flex'}}>
                    <IconButton onClick={handleRecordDialog}>
                        <Icon style={{color:'red'}}><SettingsVoiceIcon /></Icon>
                    </IconButton>
                </Grid>
            </Grid>
            </Paper>
            

            <Dialog
                open={open}
                keepMounted
                showUIAudio
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
            >
                
                <Recorder
                    record={true}
                    title={"New recording"}
                    audioURL={audio.url}
                    ui
                    handleAudioStop={data => handleAudioStop(data)}
                    handleAudioUpload={data => handleAudioUpload(data)}
                    handleReset={() => handleReset()}
                    mimeTypeToUseWhenRecording={`audio/webm`}
                />
            </Dialog>
        </>
        
    )

}

export default PronounciationWidget