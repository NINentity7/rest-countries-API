//========= variables

const container = document.querySelector('.container')
const containerDetails = document.querySelector('.container-details')
const mode = document.querySelectorAll('.mode')
const listFilter = document.querySelector('.list')
const filter = document.querySelector('.btn')
const filterBtns = document.querySelectorAll('.filter-btn')
const searchBox = document.querySelector('.busca')

const url = 'https://restcountries.eu/rest/v2/all'

//========== load screen

window.addEventListener('DOMContentLoaded', () => {
  Countries()
})
const Countries = () => {
  //======== get all countries
  getCountries = async () => {
    const response = await fetch(url)
    const data = await response.json()

    let display = data.map((country) => {
      const { numericCode, name, population, region, capital, flag } = country
      return `<div class="country ${region}" key=${numericCode}>
      <img src=${flag} alt="${name}" class="img"/>
      <h2 class="country-name">${name}</h2>
      <div class="line1">
        <h5>population:</h5>
        <p>${population}</p>
      </div>
      <div class="line2">
        <h5>region</h5>
        <p>${region}</p>
      </div>
      <div class="line3">
        <h5>capital:</h5>
        <p>${capital}</p>
      </div>
    </div>`
    })
    display = display.join('')
    container.innerHTML = display
    //======== get countries by region
    getRegions = () => {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          listFilter.classList.toggle('hidden')
          let regiao = btn.textContent
          let byRegion = data.filter((reg) => {
            return reg.region === regiao
          })
          let displayRegions = byRegion.map((country) => {
            const { numericCode, name, population, region, capital, flag } = country
            return `<div class="country ${region}" key=${numericCode}>
      <img src=${flag} alt="${name}" class="img"/>
      <h2 class="country-name">${name}</h2>
      <div class="line1">
        <h5>population:</h5>
        <p>${population}</p>
      </div>
      <div class="line2">
        <h5>region</h5>
        <p>${region}</p>
      </div>
      <div class="line3">
        <h5>capital:</h5>
        <p>${capital}</p>
      </div>
    </div>`
          })
          displayRegions = displayRegions.join('')
          container.innerHTML = displayRegions
          //==========country by regions info
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
                const { name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, flag } = country
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
              <p class="domain">${topLevelDomain}</p>
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
          <div class="btn-container">
          </div>
        </div>
      </div>
    </div>`
              })
              containerDetails.innerHTML = displayInfo
              const btnContainer = document.querySelector('.btn-container')
              land.map((country) => {
                const { borders } = country
                let bordersCountry = borders.map((border) => {
                  return `<button class="btn-borders">${border}</button>`
                }).join('')
                btnContainer.innerHTML = bordersCountry
              })
              //===========link to border countries
              borderCountries = () => {
                const btns = document.querySelectorAll('.btn-borders')
                btns.forEach((btn) => {
                  btn.addEventListener('click', () => {
                    let nextCountry = btn.textContent
                    let land = data.filter((e) => {
                      return e.alpha3Code === nextCountry
                    })
                    let displayInfo = land.map((country) => {
                      const { name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, flag } = country
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
                        <p class="domain">${topLevelDomain}</p>
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
                    <div class="btn-container">
                    </div>
                  </div>
                </div>
              </div>`
                    })
                    containerDetails.innerHTML = displayInfo
                    const btnContainer = document.querySelector('.btn-container')
                    land.map((country) => {
                      const { borders } = country
                      let bordersCountry = borders.map((border) => {
                        return `<button class="btn-borders">${border}</button>`
                      }).join('')
                      btnContainer.innerHTML = bordersCountry
                    })
                    borderCountries()
                  })
                })
              }
              borderCountries()
              //===========
            })
          })
          //====================
        })
      })
    }
    getRegions()

    //========country info
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
          const { name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, flag } = country
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
              <p class="domain">${topLevelDomain}</p>
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
          <div class="btn-container">
          </div>
        </div>
      </div>
    </div>`
        })
        containerDetails.innerHTML = displayInfo
        const btnContainer = document.querySelector('.btn-container')
        land.map((country) => {
          const { borders } = country
          let bordersCountry = borders.map((border) => {
            return `<button class="btn-borders">${border}</button>`
          }).join('')
          btnContainer.innerHTML = bordersCountry
        })
        //===========link to border countries
        borderCountries = () => {
          const btns = document.querySelectorAll('.btn-borders')
          btns.forEach((btn) => {
            btn.addEventListener('click', () => {
              let nextCountry = btn.textContent
              let land = data.filter((e) => {
                return e.alpha3Code === nextCountry
              })
              let displayInfo = land.map((country) => {
                const { name, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, flag } = country
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
                  <p class="domain">${topLevelDomain}</p>
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
              <div class="btn-container">
              </div>
            </div>
          </div>
        </div>`
              })
              containerDetails.innerHTML = displayInfo
              const btnContainer = document.querySelector('.btn-container')
              land.map((country) => {
                const { borders } = country
                let bordersCountry = borders.map((border) => {
                  return `<button class="btn-borders">${border}</button>`
                }).join('')
                btnContainer.innerHTML = bordersCountry
              })
              borderCountries()
            })
          })
        }
        borderCountries()
        //============
      })
    })
    //================
  }
  return getCountries()
}

//========== searchbox

searchBox.addEventListener('keyup', (e) => {
  const term = e.target.value.toLowerCase()
  const countries = document.querySelectorAll('.country')
  Array.from(countries).forEach((country) => {
    const name = country.children[1].textContent
    if (name.toLowerCase().indexOf(term) != -1) {
      country.style.display = ''
    }
    else {
      country.style.display = 'none'
    }
  })
})

//========== hidden list

filter.addEventListener('click', () => {
  listFilter.classList.toggle('hidden')
})