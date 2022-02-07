export enum errorMessages {
  EMPTY = '',
  BAD_REQUEST = '400 Сервер не понимает запрос из-за неверного синтаксиса',
  UNAUTHORIZED = '401 Необходима авторизация',
  PAYMENT_REQUIRED = '402 Необходима оплата',
  FORBIDDEN = '403 Доступ ограничен',
  NOT_FOUND = '404 Запрашиваемый ресурс не найден',
  METHOD_NOT_ALLOWED = '405 Метод не разрешён',
  NOT_ACCEPTABLE = '406 Не найден контент, отвечающий критериям, полученным в запросе',
  PROXY_AUTHENTICATION_REQUIRED = '407 Требуется аутентификация для прокси сервера',
  REQUEST_TIMEOUT = '408 Таймаут запроса',
  CONFLICT = '409 Запрос конфликтует с текущим состоянием сервера',
  GONE = '410 Запрашиваемый контент удалён с сервера',
  LENGTH_REQUIRED = '411 Запрос отклонён, потому что сервер требует указание заголовка Content-Length, но он не указан',
  PRECONDITION_FAILED = '412 Указанные в заголовках запроса условия, сервер не может выполнить',
  PAYLOAD_TOO_LARGE = '413 Размер запроса превышает лимит, объявленный сервером',
  URI_TOO_LONG = '414 URI-адрес запрашиваемый клиентом слишком длинный',
  UNSUPPORTED_MEDIA_TYPE = '415 Медиа формат запрашиваемых данных не поддерживается сервером',
  RANGE_NOT_SATISFIABLE = '416 Диапазон указанный заголовком запроса не может быть выполнен',
  EXPECTATION_FAILED = '417 Ожидаемый от сервера ответ не может быть выполнен сервером.',
  INTERNAL_SERVER_ERROR = '500 Внутренняя ошибка сервера',
  NOT_IMPLEMENTED = '501 Метод запроса не поддерживается сервером',
  BAD_GATEWAY = '502 Сервер-шлюз получил недопустимый ответ',
  SERVICE_UNAVAILABLE = '503 Сервис недоступен',
  GATEWAY_TIMEOUT = '504 Ошибка шлюза. Ответ не получен вовремя',
  HTTP_VERSION_NOT_SUPPORTED = '505 Версия HTTP не поддерживается',
}

export type ErrorMessage = errorMessages.EMPTY
                         | errorMessages.BAD_REQUEST
                         | errorMessages.UNAUTHORIZED
                         | errorMessages.PAYMENT_REQUIRED
                         | errorMessages.FORBIDDEN
                         | errorMessages.NOT_FOUND
                         | errorMessages.METHOD_NOT_ALLOWED
                         | errorMessages.NOT_ACCEPTABLE
                         | errorMessages.PROXY_AUTHENTICATION_REQUIRED
                         | errorMessages.REQUEST_TIMEOUT
                         | errorMessages.CONFLICT
                         | errorMessages.GONE
                         | errorMessages.LENGTH_REQUIRED
                         | errorMessages.PRECONDITION_FAILED
                         | errorMessages.PAYLOAD_TOO_LARGE
                         | errorMessages.URI_TOO_LONG
                         | errorMessages.UNSUPPORTED_MEDIA_TYPE
                         | errorMessages.RANGE_NOT_SATISFIABLE
                         | errorMessages.EXPECTATION_FAILED
                         | errorMessages.INTERNAL_SERVER_ERROR
                         | errorMessages.NOT_IMPLEMENTED
                         | errorMessages.BAD_GATEWAY
                         | errorMessages.SERVICE_UNAVAILABLE
                         | errorMessages.GATEWAY_TIMEOUT
                         | errorMessages.HTTP_VERSION_NOT_SUPPORTED