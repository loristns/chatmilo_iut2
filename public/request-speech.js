document.getElementById('autorise').onclick = () => {
    navigator.webkitGetUserMedia({ audio: true }, 
        () => {
            window.close();
        },
        () => {
            alert("Vous avez refusé le contrôle vocal ou vous ne possédez pas de microphone.");
            window.close();
        }
    );
}