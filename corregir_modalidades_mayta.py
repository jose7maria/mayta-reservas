"""
MAYTA - Corrige etiquetas de 'Carta al llegar' en DatosCliente y PagoReserva.

Ejecutar desde la raiz del proyecto: python corregir_modalidades_mayta.py
No cambia CSS, importes, validaciones ni rutas. Crea copias .bak antes de editar.
Si el archivo no coincide con la estructura esperada, no realiza cambios.
"""
from pathlib import Path
import re
import shutil
import sys


def sustituir_uno(texto, patron, reemplazo, etiqueta):
    nuevo, cantidad = re.subn(patron, reemplazo, texto, count=0, flags=re.S)
    if cantidad != 1:
        raise ValueError(f"{etiqueta}: esperaba 1 coincidencia, encontre {cantidad}.")
    return nuevo


def cambiar_datos(texto):
    if "const esCarta = datosReserva.tipoReserva === 'carta';" in texto:
        print("DatosCliente.jsx ya tiene la modalidad configurada; no lo modificare otra vez.")
        return None
    texto = sustituir_uno(
        texto,
        r"(const\s+datosReserva\s*=\s*location\.state\s*\|\|\s*\{\s*\}\s*;)",
        r"\1\n\n  // Modalidad recibida desde Reserva y Disponibilidad.\n  const esCarta = datosReserva.tipoReserva === 'carta';",
        "DatosCliente: informacion recibida"
    )
    texto = sustituir_uno(texto,
        r'(?<![A-Za-z])CONSUMO\s+SELECCIONADO(?![A-Za-z])',
        "{esCarta ? 'GARANTÍA DE RESERVA' : 'CONSUMO SELECCIONADO'}",
        'DatosCliente: titulo del resumen')
    texto = sustituir_uno(texto,
        r"\?\s*'experiencia asignada'\s*:\s*'experiencias asignadas'",
        "? (esCarta ? 'persona · Carta al llegar' : 'experiencia asignada')\n                  : (esCarta ? 'personas · Carta al llegar' : 'experiencias asignadas')",
        'DatosCliente: descripcion del resumen')
    texto = sustituir_uno(texto,
        r'(?<![A-Za-z])TOTAL\s+ESTIMADO(?![A-Za-z])',
        "{esCarta ? 'GARANTÍA A PAGAR' : 'TOTAL ESTIMADO'}",
        'DatosCliente: nombre del total')
    return texto


def cambiar_pago(texto):
    if "const esCarta = datosReserva.tipoReserva === 'carta';" in texto:
        print("PagoReserva.jsx ya tiene la modalidad configurada; no lo modificare otra vez.")
        return None
    texto = sustituir_uno(texto,
        r"(const\s+datosReserva\s*=\s*location\.state\s*\|\|\s*\{\s*\}\s*;)",
        r"\1\n\n  // Diferenciamos el anticipo de Carta al llegar del consumo de experiencias.\n  const esCarta = datosReserva.tipoReserva === 'carta';",
        'PagoReserva: informacion recibida')
    texto = sustituir_uno(texto,
        r'(?<![A-Za-z])EXPERIENCIAS\s+SELECCIONADAS(?![A-Za-z])',
        "{esCarta ? 'GARANTÍA DE RESERVA' : 'EXPERIENCIAS SELECCIONADAS'}",
        'PagoReserva: titulo del detalle')
    texto = sustituir_uno(texto,
        r'(<span>\s*)CONSUMO(\s*</span>)',
        r"\1{esCarta ? 'GARANTÍA' : 'CONSUMO'}\2",
        'PagoReserva: resumen de consumo')
    texto = sustituir_uno(texto,
        r'(\s*)Revisa\s+el\s+detalle\s+y\s+completa\s+el\s+pago\s+para\s+confirmar\s+tu\s+experiencia\.(\s*)',
        r"\1{esCarta\n                ? 'Revisa y paga la garantía para confirmar tu mesa.'\n                : 'Revisa el detalle y completa el pago para confirmar tu experiencia.'}\2",
        'PagoReserva: instruccion del pago')
    # Una etiqueta secundaria 'Consumo' puede estar en la tarjeta de total.
    # Si existe como elemento JSX completo, tambien debe distinguirse de la garantia.
    texto = re.sub(r'(<(?:small|span|p)>\s*)Consumo(\s*</(?:small|span|p)>)',
        r"\1{esCarta ? 'Garantía de reserva' : 'Consumo'}\2", texto)
    return texto


def main():
    raiz = Path.cwd()
    if not (raiz / 'src' / 'pages').is_dir():
        raiz = Path(__file__).resolve().parent
    carpeta = raiz / 'src' / 'pages'
    if not carpeta.is_dir():
        raise FileNotFoundError(
            'No encuentro src/pages. Copia este script a la carpeta mayta-reservas y ejecútalo desde alli.'
        )

    trabajos = [(carpeta / 'DatosCliente.jsx', cambiar_datos),
                (carpeta / 'PagoReserva.jsx', cambiar_pago)]
    preparados = []
    for archivo, funcion in trabajos:
        if not archivo.exists():
            raise FileNotFoundError(f'Falta {archivo}')
        original = archivo.read_text(encoding='utf-8-sig')
        nuevo = funcion(original)
        if nuevo is not None:
            preparados.append((archivo, original, nuevo))

    # No guardar absolutamente nada si una validacion de cualquier archivo fallo.
    for archivo, original, nuevo in preparados:
        copia = archivo.with_suffix('.jsx.bak')
        if copia.exists():
            raise FileExistsError(f'Ya existe {copia}; para evitar pisar un respaldo, no se aplicaron cambios.')
    for archivo, original, nuevo in preparados:
        copia = archivo.with_suffix('.jsx.bak')
        shutil.copy2(archivo, copia)
        archivo.write_text(nuevo, encoding='utf-8')
        print(f'ACTUALIZADO: {archivo.name} (respaldo: {copia.name})')

    if not preparados:
        print('No hay modificaciones pendientes.')
    print('Listo. Ejecuta npm start y prueba Carta al llegar / Experiencia.')


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        print('NO SE APLICARON LOS CAMBIOS:', exc, file=sys.stderr)
        sys.exit(1)
