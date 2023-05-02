import re
import sys
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


def getPersonData(driver):

    person = {
        "name": "",
        "originalName": "",
        "photo": "",
        "professions": []
    }

    name = WebDriverWait(driver, timeout=3).until(
        lambda d: d.find_element(By.XPATH, "//h1[contains(@class, 'styles_primaryName__2Zu1T')]"))
    person.update({"name": name.text})

    try:
        originalName = WebDriverWait(driver, timeout=3).until(
        lambda d: d.find_element(By.XPATH, "//div[contains(@class, 'styles_secondaryName__MpB48')]"))
        person.update({"originalName": originalName.text})
    except Exception as e:
        person.update({"originalName": person["name"]})

    photo = WebDriverWait(driver, timeout=3).until(
        lambda d: d.find_element(By.XPATH,
                                 "//img[contains(@class, 'styles_image__lSxoD')]"))
    person.update({"photo": photo.get_attribute('src')})

    professions = photo = WebDriverWait(driver, timeout=3).until(
        lambda d: d.find_elements(By.XPATH,
                                 "//div[contains(text(), 'Карьера')]/parent::div/div[contains(@class, 'styles_value__g6yP4')]//button"))
    for profession in professions:
        prof = profession.text
        if (prof == 'Актриса'):
            prof = 'Актер'
        person["professions"].append(prof)

    driver.back()

    return person

def addCreator(driver, profession):
    creators = []

    for i in range (0, 3):
        links = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_elements(By.XPATH, "//div[contains(text(), '{}')]/parent::div//a".format(profession)))
        try:
            link = links[i]
        except Exception:
            continue

        link.click()
        creators.append(getPersonData(driver))

    return creators

def getActors(driver):
    actors = []

    actorsElement = WebDriverWait(driver, timeout=3).until(
        lambda d: d.find_elements(By.XPATH,
                                  "//div[contains(@class, 'styles_actors__wn_C4')]//li/a"))

    for i in range(1, len(actorsElement) + 1):
        link = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                      "//div[contains(@class, 'styles_actors__wn_C4')]//li[{}]/a".format(
                                          i)))

        link.click()

        actors.append(getPersonData(driver))

    return actors

def getGenres(driver):
    genres = []

    try:
        genresElement = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_elements(By.XPATH,
                                      "//div[contains(text(), 'Жанр')]/parent::div//a"))

        for genresElement in genresElement:
            genre = genresElement.text

            if not genre == 'слова':
                genres.append(genre)
    except Exception:
        pass

    return genres

def getCountries(driver):
    countries = []

    try:
        countriesElement = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_elements(By.XPATH,
                                      "//div[contains(text(), 'Страна')]/parent::div//a"))

        for countriesElement in countriesElement:
            countries.append(countriesElement.text)
    except Exception:
        pass

    return countries

def getAwards(driver):
    awards = []

    try:
        link = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                      "//div[contains(@class, 'styles_awards__stpdy')]/a"))
        link.click()

        awardsElements = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_elements(By.XPATH,
                                      "//table//td//table[@class='js-rum-hero']//table[contains(@style, 'background')]"))

        for i in range(1, len(awardsElements) + 1):
            award = {
                "name": '',
                "year": 0,
                "nominations": []
            }

            name = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                      "//table//td//table[@class='js-rum-hero']//table[contains(@style, 'background')][{}]//b".format(i)))
            name = name.text.split(', ')

            award.update({"name": name[0]})
            award.update({"year": int(name[1].replace(' год', ''))})
            nominationsElements = []
            try:
                nominationsElements = WebDriverWait(driver, timeout=3).until(
                    lambda d: d.find_elements(By.XPATH,
                    "//a[contains(text(),'{}')]/parent::b/parent::td/parent::tr/parent::tbody//b[text()='Победитель']/ancestor::tr/following-sibling::tr[1]//ul//li".format(name[0])))
            except Exception as e:
                pass

            if (len(nominationsElements) > 0):
                for k in range(1, len(nominationsElements) + 1):
                    nomination = WebDriverWait(driver, timeout=3).until(
                        lambda d: d.find_element(By.XPATH,
                                                 "//a[contains(text(),'{}')]/parent::b/parent::td/parent::tr/parent::tbody//b[text()='Победитель']/ancestor::tr/following-sibling::tr[1]//ul//li[{}]//a".format(name[0], k)))
                    award["nominations"].append({"name": nomination.text})

                awards.append(award)


        driver.back()
    except Exception:
        pass

    return awards

def getRelatedFilms(driver):
    relatedFilms = []

    try:
        relatedFilmsElements = WebDriverWait(driver, timeout=3).until(
                        lambda d: d.find_elements(By.XPATH,
                                                 "//span[@class='styles_title__5zsyx']/span/span"))
        for relatedFilmsElement in relatedFilmsElements:
            relatedFilms.append(relatedFilmsElement.text)
    except Exception:
        pass

    return relatedFilms

def getFilmData(driver):
    film = {
        "name": "",
        "originalName": "",
        "poster": "",
        "mpaaRating": "",
        "rating": 0,
        "ratingsNumber": 0,
        "year": 0,
        "duration": "",
        "description": ""
    }
    seasons = None

    name = WebDriverWait(driver, timeout=3).until(
        lambda d: d.find_element(By.XPATH, "//h1[@itemprop='name']/span"))
    filtered_name = re.sub(r'\(\d+\)', '', name.text)
    film.update({"name": filtered_name})

    try:
        originalname = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//span[contains(@class, 'styles_originalTitle__JaNKM')]"))
        film.update({"originalName": originalname.text})

    except Exception as e:
        film.update({"originalName": film.name})

    try:
        poster = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//img[contains(@class, 'film-poster')]"))
        film.update({"poster": poster.get_attribute("src")})

    except Exception as e:
        film.update({"poster": ""})

    try:
        mpaaRating = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//span[@class='styles_ageRate__340KC']"))
        film.update({"mpaaRating": mpaaRating.text})

    except Exception as e:
        film.update({"mpaaRating": "-"})

    try:
        rating = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//span[contains(@class, 'film-rating-value')]/span"))
        film.update({"rating": float(rating.text)})

    except Exception as e:
        film.update({"rating": 0})

    try:
        ratingsNumber = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//span[@class='styles_count__iOIwD']"))
        filtered_ratingsNumber = re.sub(r'оцен(ки)?(ка)?(ок)?', '', ratingsNumber.text)
        filtered_ratingsNumber = filtered_ratingsNumber.replace(" ", "")
        film.update({"ratingsNumber": int(filtered_ratingsNumber)})

    except Exception as e:
        film.update({"ratingsNumber": "-"})

    try:
        year = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//div[contains(text(), 'Год производства')]/parent::div/div[2]"))
        film.update({"year": int(year.text[:4])})
        seasons = re.search(r'\d сезон(а)?(ов)?', year.text).group(0)
    except Exception as e:
        seasons = None

    try:
        duration = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//div[contains(text(), 'Время')]/parent::div/div[2]"))
        film.update({"duration": re.sub(r'\d+ мин. / ', '', duration.text)})
        if seasons:
            film.update({"duration": seasons})
    except Exception as e:
        film.update({"duration": "-"})

    try:
        description = WebDriverWait(driver, timeout=3).until(
            lambda d: d.find_element(By.XPATH,
                                     "//p[@class='styles_paragraph__wEGPz']"))
        film.update({"description": description.text})

    except Exception as e:
        film.update({"description": "-"})

    creators = {
        "directors": [],
        "writers": [],
        "producers": [],
        "cinematography": [],
        "musicians": [],
        "designers": [],
        "editors": [],
    }

    creators.update({"directors": addCreator(driver, "Режиссер")})
    creators.update({"writers": addCreator(driver, "Сценарий")})
    creators.update({"producers": addCreator(driver, "Продюсер")})
    creators.update({"cinematography": addCreator(driver, "Оператор")})
    creators.update({"musicians": addCreator(driver, "Композитор")})
    creators.update({"designers": addCreator(driver, "Художник")})
    creators.update({"editors": addCreator(driver, "Монтаж")})

    actors = getActors(driver)

    genres = getGenres(driver)

    countries = getCountries(driver)

    awards = getAwards(driver)

    driver.execute_script("window.scrollTo(0, 2000)")
    relatedFilms = getRelatedFilms(driver)

    driver.back()

    return {
        "film": film,
        "creators": creators,
        "actors": actors,
        "genres": genres,
        "countries": countries,
        "awards": awards,
        "relatedFilms": relatedFilms,
    }

def ParseFilm(driver, i):
    el = WebDriverWait(driver, timeout=3).until(
        lambda d: d.find_element(By.XPATH,
                                 "//div[@id='itemList']/div[{}]//a[1]".format(
                                     i)))
    el.click()

    return getFilmData(driver)

def ParseFilms():
    result = []
    options = Options()

    driver = webdriver.Chrome(
        ChromeDriverManager().install(), options=options)

    driver.get(
        'https://www.kinopoisk.ru/top/navigator/m_act[rating]/1%3A/order/num_vote/perpage/200/#results')

    for i in range (1, 200):
        try:
            result.append(ParseFilm(driver, i))
        except Exception:
            continue

    for i in range(2, 6):
        driver.get(
            'https://www.kinopoisk.ru/top/navigator/m_act[rating]/1%3A/order/num_vote/page/{}/#results'.format(i))

        for i in range(1, 200):
            try:
                result.append(ParseFilm(driver, i))
            except Exception:
                continue

    driver.quit()

    print(result)


def ParseOneFilm():
    result = []
    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-ssl-errors=yes')
    options.add_argument('--ignore-certificate-errors')

    driver = webdriver.Remote(
    command_executor='http://chrome:4444/wd/hub',
    options=options
    )

    driver.get(sys.argv[2])

    result.append(getFilmData(driver))

    driver.quit()
    print(result, flush=True)

sys.stdout.reconfigure(encoding='utf-8')

if sys.argv[1] == 'ParseOneFilm':
    ParseOneFilm()
elif sys.argv[1] == 'ParseFilms':
    ParseFilms()

sys.stdout.flush()
