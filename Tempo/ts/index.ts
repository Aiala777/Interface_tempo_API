const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector('#tempo-info')

form?.addEventListener( "submit", async(event) => {
    event.preventDefault(); // evita que o form recarregue a pagina

    if(!input || !sectionTempoInfo) return

    const localizacao = input.value;

    if (localizacao.length < 3) { 
        alert('Por favor, insira uma localização com mais de 3 letras');
        return;
    }

    try{

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=cc7661b2d930d78c5708b1ceb9fef5a0&lang=pt_br&units=metric`)

    const dados = await response.json();

    const infos = {
        temperatura: Math.round(dados.main.temp),
        local: dados.name,
        icone : `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`,
    };

    sectionTempoInfo.innerHTML = `
        <div class="tempo-dados">
                <h2>${infos.local}</h2>

                <span>${infos.temperatura}°C</span>
            </div>

            <img src="${infos.icone}">
        `;
    }catch (err){
        console.log("Deu um erro na obtenção dos dados da API!!", err);
    }
});