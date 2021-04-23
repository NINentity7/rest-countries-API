
export default function Flags() {
  const flags = document.querySelectorAll('.img')
  flags.forEach((flag) => {
    flag.addEventListener('click', () => {
      mode.forEach((element) => {
        element.classList.toggle('hidden')
      })
      let flagSrc = flag.getAttribute('src')
      let land = data.filter((e) => {
        return e.flag === flagSrc
      })
      let displayInfo = land.map((country) => {
        const { name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, flag, borders } = country
        return `<div class="country-details">
      <div class="img-container">
        <img src=${flag} alt="${name}" />
      </div>
      <div class="info-details">
        <div class="country-name">
          <h2>${name}</h2>
        </div>
        <div class="info-container">
          <div class="geo">
            <div class="line4">
              <h4>native name</h4>
              <p>${nativeName}</p>
            </div>
            <div class="line5">
              <h4>population</h4>
              <p>${population}</p>
            </div>
            <div class="line6">
              <h4>region</h4>
              <p>${region}</p>
            </div>
            <div class="line7">
              <h4>sub region</h4>
              <p>${subregion}</p>
            </div>
            <div class="line8">
              <h4>capital</h4>
              <p>${capital}</p>
            </div>
          </div>
          <div class="general">
            <div class="line9">
              <h4>top level domain</h4>
              <p>${topLevelDomain}</p>
            </div>
            <div class="line10">
              <h4>currencies</h4>
              <p>${currencies.map((e) => {
          return e.name
        })}</p>
            </div>
            <div class="line11">
              <h4>languages</h4>
              <p>${languages.map((e) => {
          return e.name
        })}</p>
            </div>
          </div>
        </div>
        <div class="borders">
          <h3>border countries</h3>
          <button class="btn-borders">${borders}</button>
        </div>
      </div>
    </div>`
      })
      containerDetails.innerHTML = displayInfo
    })
  })
}