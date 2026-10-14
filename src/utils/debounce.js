let timer;

export const debounce = (func, time) => {
    clearTimeout(time);

    timer = setTimeout(func, time)
}

