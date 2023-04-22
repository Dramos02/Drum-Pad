const audioSet = [
    {id:'kick-drum', keyCode:81, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587165/fcc-drum-machine/kick-drums/kick-drum-7.mp3',keyTrigger:'Q'},
    {id:'Snare', keyCode:87, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587362/fcc-drum-machine/snare-drums/snaredrum1.mp3',keyTrigger:'W'},
    {id:'Hi-Hat-Open', keyCode:69, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587997/fcc-drum-machine/hi-hats/hihat1.mp3',keyTrigger:'E'},
    {id:'Hi-Hat-Close', keyCode:65, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587997/fcc-drum-machine/hi-hats/hihat4.mp3',keyTrigger:'A'},
    {id:'Tom-Tom', keyCode:83, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532588185/fcc-drum-machine/tom-toms/tomtomdrum3.mp3',keyTrigger:'S'},
    {id:'Crash', keyCode:68, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587948/fcc-drum-machine/cymbals%202/cymbalcrash1.mp3',keyTrigger:'D'},
    {id:'Ride', keyCode:90, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532582454/sample-swap/drums-and-single-hits/rides/RIDE_S_11.mp3',keyTrigger:'Z'},
    {id:'China', keyCode:88, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532580120/sample-swap/drums-and-single-hits/china/big_china_cym.mp3',keyTrigger:'X'},
    {id:'Cowbell', keyCode:67, src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587867/fcc-drum-machine/cowbells/cowbell1.mp3', keyTrigger:'C'}
  ];
  /*This is api of audioSet/Drum set*/

function App () {

    let [volume, setVolume] = React.useState(1); /*this is to navigate the volume slider function*/
    let [recording, setRecording] = React.useState(" ");  /*this is to navigate the recording function*/
    let [speed, setSpeed] = React.useState(0.5);  /*this is to navigate speed of the recordings*/

    const playRecording = () => {
        let index = 0;
        let recordArray = recording.split(" ");

        const interval = setInterval(() => {
            const audioTag = document.getElementById(recordArray[index]);
            audioTag.volume = volume;
            audioTag.currentTime = 0;
            audioTag.play();
            index++;
         }, speed * 600);
         setTimeout(() => clearInterval(interval), 600 * speed * recordArray.length-1);
    };

    return (
        <div style={{backgroundImage: ("url('./wallpaper.jpg')") , minHeight: "100vh"}} id="background-image">
        <div className="container pt-2">
        <div className="card shadow mb-2 rounded bg-dark text-center text-white">
             <div className="card-header font-weight-bold font-italic">Drum Pad</div>
            <div className="card-body p-5">
                {audioSet.map(clip => (
                    <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>
                ))}
                <br />
                <h4>Volume</h4>
                    <input type="range" step="0.01" onChange={(e) => setVolume(e.target.value)} value={volume} max="1" min="0" className="w-50"/>
                <h3>{recording}</h3>
                    {recording && (
                        <>
                            <button onClick={playRecording} className="btn btn-success">
                                Play
                            </button>
                            <button onClick={() => setRecording("")} className="btn btn-danger">
                                Clear
                            </button>
                            <br/>
                            <h4>Speed</h4>
                            <input type="range"  step="0.01" onChange={(e) => setSpeed(e.target.value)} value={speed} max="1.2" min="0" className="w-50"/>
                        </>
                    )}
            </div>
        </div>
    </div>
        <footer id="footer">
        <p>Copyrights <i class="fa fa-copyright"></i> Dramos02 <a href="https://github.com/Dramos02" target="_blank" id="profile-link" class="githubicon">
        <i class="fa fa-github zoom"></i></a></p>
        </footer>   
    </div>
   
    ); 
          
}

function Pad({ clip, volume, setRecording }){

    let [active, setActive] = React.useState(false); /*this one is to navigate the activation of btn that will change it color when it's pressed*/

    React.useEffect(() =>{
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const handleKeyPress = (e) => {
        if (e.keyCode === clip.keyCode){
            playAudio();
        }
    };
    const playAudio = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        setActive(true);
        setTimeout (() => setActive(false), 200);
        audioTag.volume = volume;
        audioTag.currentTime = 0;
        audioTag.play();
        setRecording((prev => prev + clip.keyTrigger + " "));
    };
    
    return (
        <div onClick={playAudio} className={`btn btn-info d-inline-table p-4 m-3 ${active && "btn-light"}`}> 
            <audio className="clip" id={clip.keyTrigger} src={clip.src}/> 
            {clip.keyTrigger}
        
        
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('drum')) 