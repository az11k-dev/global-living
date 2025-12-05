'use client';
// hooks/useCountryFilters.ts
import {useCallback} from 'react';
import {useSearchParams, useRouter, usePathname} from 'next/navigation';

/**
 * Хук для управления параметрами фильтрации в URL (search params).
 * Это централизованное место для логики чтения/записи фильтров.
 * * @returns {object} {
 * getActiveFilter: (name: string) => string | undefined,
 * handleFilterChange: (filterName: string, filterValue: string | null) => void,
 * handleClearAllFilters: () => void,
 * currentQueryString: string,
 * }
 */
export const useCountryFilters = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // 1. Функция для получения текущего активного значения фильтра
    const getActiveFilter = useCallback((name: string): string | undefined => {
        const value = searchParams.get(name);
        return value || undefined;
    }, [searchParams]);

    // 2. Функция для создания новой строки запроса (URLSearchParams)
    const createQueryString = useCallback(
        (name: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === null || value === "") {
                // Если значение null или пустая строка, удаляем параметр
                params.delete(name);
            } else {
                // Иначе устанавливаем (заменяем) новое значение
                params.set(name, value);
            }
            return params.toString();
        },
        [searchParams]
    );

    // 3. Главный обработчик изменения фильтра (вызывается из FilterSection)
    const handleFilterChange = useCallback((filterName: string, filterValue: string | null) => {
        const newQuery = createQueryString(filterName, filterValue);
        // Используем replace вместо push для более чистого истории браузера
        router.replace(pathname + (newQuery ? `?${newQuery}` : ''));
    }, [createQueryString, pathname, router]);

    // 4. Очистка всех фильтров
    const handleClearAllFilters = useCallback(() => {
        router.replace(pathname); // Просто переходим на чистый путь без параметров
    }, [pathname, router]);

    // 5. Текущая строка запроса для использования в fetch
    const currentQueryString = searchParams.toString();

    return {
        getActiveFilter,
        handleFilterChange,
        handleClearAllFilters,
        currentQueryString,
    };
};
