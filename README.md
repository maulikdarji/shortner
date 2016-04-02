# FCC - URL Shortener Microservice

## User Stories:

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link

## Valid URL format
>http://www.example.com

## Example Usage:
`https://shortner-maulikdarji.c9users.io/new/https://www.google.com`

`https://shortner-maulikdarji.c9users.io/new/http://freecodecamp.com/news`

## Example Output

  `{ "original_url": "http://freecodecamp.com/news", "short_url": "https://shortner-maulikdarji.c9users.io/4" }`
  <hr>

>##### Project for [FreeCodeCamp](https://www.freecodecamp.com/maulikdarji)