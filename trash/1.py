import pandas as pd
from datetime import datetime
import os

def fill_xg_data_from_excel():
    """
    Заповнює пропущені xG дані в файлі 1.xlsx на основі даних з файлу 2.xlsx
    Використовує дату + голи як ключ для з'єднання
    """
    # Шляхи до файлів
    base_path = r"C:\Users\Nazar\Desktop\Why_football_is_so_popular"
    file1_path = os.path.join(base_path, "1.xlsx")
    file2_path = os.path.join(base_path, "2.xlsx")
    output_path = os.path.join(base_path, "3.xlsx")
    
    print("Завантаження файлів...")
    
    # Читаємо файл 1 (основні дані з пропусками)
    try:
        df1 = pd.read_excel(file1_path)
        print(f"Файл 1.xlsx завантажено: {len(df1)} записів")
        print("Колонки файлу 1:", df1.columns.tolist())
    except Exception as e:
        print(f"Помилка при читанні файлу 1.xlsx: {e}")
        return
    
    # Читаємо файл 2 (дані understat)
    try:
        df2 = pd.read_excel(file2_path)
        print(f"Файл 2.xlsx завантажено: {len(df2)} записів")
        print("Колонки файлу 2:", df2.columns.tolist())
    except Exception as e:
        print(f"Помилка при читанні файлу 2.xlsx: {e}")
        return
    
    # Конвертуємо дати у файлі 1
    print("\nКонвертація дат...")
    if 'Date' in df1.columns:
        df1['Date'] = pd.to_datetime(df1['Date'], errors='coerce')
    else:
        print("Колонка 'Date' не знайдена у файлі 1")
        return
    
    # Конвертуємо дати у файлі 2
    if 'date' in df2.columns:
        df2['date'] = pd.to_datetime(df2['date'], errors='coerce')
    else:
        print("Колонка 'date' не знайдена у файлі 2")
        return
    
    # Створюємо ключі для з'єднання (дата + голи)
    print("Створення ключів для з'єднання...")
    
    # Ключ для файлу 1: дата_голи1-голи2
    df1['match_key'] = (
        df1['Date'].dt.strftime('%Y-%m-%d') + '_' +
        df1['G1'].astype(str) + '-' + df1['G2'].astype(str)
    )
    
    # Ключ для файлу 2: дата_голи1-голи2
    df2['match_key'] = (
        df2['date'].dt.strftime('%Y-%m-%d') + '_' +
        df2['home_goals'].astype(str) + '-' + df2['away_goals'].astype(str)
    )
    
    # Показуємо приклади ключів
    print("\nПриклади ключів з файлу 1:")
    print(df1[['Date', 'Team1', 'Team2', 'G1', 'G2', 'match_key']].head())
    
    print("\nПриклади ключів з файлу 2:")
    print(df2[['date', 'home_team', 'away_team', 'home_goals', 'away_goals', 'match_key']].head())
    
    # Створюємо словник для швидкого пошуку даних з файлу 2
    print("\nСтворення lookup словника...")
    lookup_dict = {}
    
    for _, row in df2.iterrows():
        key = row['match_key']
        lookup_dict[key] = {
            'home_xG': row['home_xG'],
            'away_xG': row['away_xG'],
            'home_xpts': row['home_xpts'],
            'away_xpts': row['away_xpts']
        }
    
    print(f"Створено lookup з {len(lookup_dict)} ключів")
    
    # Підрахунок пропущених даних
    missing_before = ((df1['xG1'] == 0) & (df1['xG2'] == 0)).sum()
    print(f"\nЗаписів без xG даних: {missing_before}")
    
    # Заповнюємо дані
    print("Заповнення пропущених даних...")
    filled_count = 0
    
    for idx, row in df1.iterrows():
        # Якщо xG дані вже є, пропускаємо
        if pd.notna(row['xG1']) and row['xG1'] != 0:
            continue
        if pd.notna(row['xG2']) and row['xG2'] != 0:
            continue
            
        match_key = row['match_key']
        
        # Шукаємо дані в lookup словнику
        if match_key in lookup_dict:
            match_data = lookup_dict[match_key]
            
            # Заповнюємо xG дані
            df1.at[idx, 'xG1'] = round(match_data['home_xG'], 2)
            df1.at[idx, 'xG2'] = round(match_data['away_xG'], 2)
            df1.at[idx, 'xpts1'] = round(match_data['home_xpts'], 2)
            df1.at[idx, 'xpts2'] = round(match_data['away_xpts'], 2)
            
            filled_count += 1
    
    # Підрахунок після заповнення
    missing_after = ((df1['xG1'] == 0) & (df1['xG2'] == 0)).sum()
    
    print(f"\nРезультати заповнення:")
    print(f"Записів заповнено: {filled_count}")
    print(f"Записів без xG до: {missing_before}")
    print(f"Записів без xG після: {missing_after}")
    print(f"Покращення: {missing_before - missing_after} записів")
    
    # Видаляємо допоміжні колонки
    df1 = df1.drop('match_key', axis=1)
    
    # Збереження результату
    print(f"\nЗбереження результату в {output_path}...")
    try:
        df1.to_excel(output_path, index=False)
        print("Файл 3.xlsx успішно збережено!")
    except Exception as e:
        print(f"Помилка при збереженні: {e}")
        return
    
    # Показуємо статистику
    print(f"\nФінальна статистика:")
    print(f"Всього записів: {len(df1)}")
    
    # Статистика xG покриття
    has_xg = ((df1['xG1'] != 0) | (df1['xG2'] != 0)).sum()
    print(f"Записів з xG даними: {has_xg}")
    print(f"Покриття xG: {has_xg/len(df1)*100:.1f}%")
    
    # Показуємо перші записи з заповненими даними
    filled_records = df1[(df1['xG1'] != 0) | (df1['xG2'] != 0)]
    if len(filled_records) > 0:
        print(f"\nПерші 5 записів з xG даними:")
        print(filled_records[['Date', 'Team1', 'Team2', 'G1', 'G2', 'xG1', 'xG2', 'xpts1', 'xpts2']].head())
    
    return df1

def show_sample_matches():
    """
    Показує приклади потенційних збігів для діагностики
    """
    base_path = r"C:\Users\Nazar\Desktop\Why_football_is_so_popular"
    file1_path = os.path.join(base_path, "1.xlsx")
    file2_path = os.path.join(base_path, "2.xlsx")
    
    try:
        df1 = pd.read_excel(file1_path)
        df2 = pd.read_excel(file2_path)
        
        # Конвертуємо дати
        df1['Date'] = pd.to_datetime(df1['Date'], errors='coerce')
        df2['date'] = pd.to_datetime(df2['date'], errors='coerce')
        
        # Створюємо ключі
        df1['match_key'] = (
            df1['Date'].dt.strftime('%Y-%m-%d') + '_' +
            df1['G1'].astype(str) + '-' + df1['G2'].astype(str)
        )
        
        df2['match_key'] = (
            df2['date'].dt.strftime('%Y-%m-%d') + '_' +
            df2['home_goals'].astype(str) + '-' + df2['away_goals'].astype(str)
        )
        
        # Знаходимо записи без xG
        missing_xg = ((df1['xG1'] == 0) & (df1['xG2'] == 0))
        missing_data = df1[missing_xg]
        
        print("Приклади потенційних збігів:")
        print("=" * 80)
        
        matches_found = 0
        for i, (_, row) in enumerate(missing_data.head(10).iterrows()):
            match_key = row['match_key']
            matching = df2[df2['match_key'] == match_key]
            
            if len(matching) > 0:
                matches_found += 1
                print(f"\n✓ ЗБІГ {matches_found}:")
                print(f"  Файл 1: {row['Date'].strftime('%d.%m.%Y')} {row['Team1']} vs {row['Team2']} ({row['G1']}-{row['G2']})")
                for _, match in matching.iterrows():
                    print(f"  Файл 2: {match['date'].strftime('%d.%m.%Y')} {match['home_team']} vs {match['away_team']} ({match['home_goals']}-{match['away_goals']}) xG: {match['home_xG']:.2f}-{match['away_xG']:.2f}")
            else:
                print(f"\n✗ НЕ ЗНАЙДЕНО:")
                print(f"  Файл 1: {row['Date'].strftime('%d.%m.%Y')} {row['Team1']} vs {row['Team2']} ({row['G1']}-{row['G2']}) - ключ: {match_key}")
        
        print(f"\nВсього потенційних збігів знайдено: {matches_found} з 10 перевірених")
        
    except Exception as e:
        print(f"Помилка при аналізі файлів: {e}")

if __name__ == "__main__":
    print("Аналіз потенційних збігів:")
    print("="*50)
    show_sample_matches()
    
    print("\n" + "="*50)
    print("ЗАПОВНЕННЯ ДАНИХ:")
    print("="*50)
    
    # Заповнюємо дані
    result = fill_xg_data_from_excel()
    
    if result is not None:
        print("\n✅ Процес завершено успішно!")
        print("Перевірте файл 3.xlsx у папці C:\\Users\\Nazar\\Desktop\\Why_football_is_so_popular")
    else:
        print("\n❌ Процес завершено з помилками")