const mockFilter = {
    "filters": [
        {
            "id": "locale",
            "name": "Locale",
            "values": [
                {
                "value": "en_AU",
                "name": "en_AU"
                }
            ]
        },
        {
            "id": "country",
            "name": "País",
            "values": [
                {
                    "value": "AU",
                    "name": "Australia"
                }
            ]
        },
        {
            "id": "timestamp",
            "name": "Data e Horário",
            "validation": {
                "primitiveType": "STRING",
                "entityType": "DATE_TIME",
                "pattern": "yyyy-MM-ddTHH:mm:ss"
            }
        },
        {
            "id": "limit",
            "name": "Quantidade",
            "validation": {
                "primitiveType": "INTEGER",
                "min": 1,
                "max": 50
            }
        },
        {
            "id": "offset",
            "name": "Página",
            "validation": {
                "primitiveType": "INTEGER"
            }
        }
    ]
}

export default mockFilter;
