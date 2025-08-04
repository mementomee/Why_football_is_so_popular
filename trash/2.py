import pandas as pd
import re

def fix_csv_decimal_separators(input_file, output_file):
    """
    Виправляє десяткові роздільники з коми на крапки у CSV файлі
    """
    print(f"Читання файлу: {input_file}")
    
    # Читаємо файл як текст
    with open(input_file, 'r', encoding='utf-8') as file:
        content = file.read()
    
    print("Виправлення десяткових роздільників...")
    
    # Замінюємо коми на крапки тільки в числових значеннях
    # Регулярний вираз для знаходження чисел з комами
    pattern = r'\b(\d+),(\d+)\b'
    fixed_content = re.sub(pattern, r'\1.\2', content)
    
    # Зберігаємо виправлений файл
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(fixed_content)
    
    print(f"Виправлений файл збережено: {output_file}")
    
    # Показуємо приклад змін
    print("\nПриклад змін:")
    lines = content.split('\n')[:3]
    fixed_lines = fixed_content.split('\n')[:3]
    
    for i, (original, fixed) in enumerate(zip(lines, fixed_lines)):
        if original != fixed:
            print(f"Було:  {original[:100]}...")
            print(f"Стало: {fixed[:100]}...")
            break

def fix_excel_decimal_separators(input_file, output_file):
    """
    Виправляє десяткові роздільники в Excel файлі
    """
    print(f"Читання Excel файлу: {input_file}")
    
    # Читаємо Excel файл
    df = pd.read_excel(input_file)
    
    print("Виправлення десяткових роздільників в Excel...")
    
    # Функція для конвертації рядків з комами в числа
    def convert_comma_to_float(value):
        if isinstance(value, str):
            # Якщо це рядок з комою замість крапки
            if ',' in value and value.replace(',', '').replace('.', '').isdigit():
                return float(value.replace(',', '.'))
        return value
    
    # Застосовуємо конвертацію до всіх колонок
    for col in df.columns:
        df[col] = df[col].apply(convert_comma_to_float)
    
    # Зберігаємо виправлений файл
    df.to_excel(output_file, index=False)
    print(f"Виправлений Excel файл збережено: {output_file}")
    
    # Показуємо приклад даних
    print("\nПерші кілька записів виправленого файлу:")
    print(df.head(3))

def create_powerbi_ready_file(input_file, output_file):
    """
    Створює файл, повністю готовий для Power BI
    """
    print(f"Створення файлу для Power BI: {input_file}")
    
    # Читаємо дані (автоматично визначаємо формат)
    if input_file.endswith('.xlsx'):
        df = pd.read_excel(input_file)
    else:
        df = pd.read_csv(input_file)
    
    print("Обробка даних для Power BI...")
    
    # Список колонок, які мають бути числовими
    numeric_columns = [
        'G1', 'G2', 'S1', 'S2', 'ST1', 'ST2', 'W1', 'D', 'W2', 
        '>2,5', '<2,5', 'Index', 'xG1', 'xG2', 'xpts1', 'xpts2', 
        'pts1', 'pts2', 'xpts_diff1', 'xpts_diff2'
    ]
    
    # Функція для очищення числових значень
    def clean_numeric_value(value):
        if pd.isna(value):
            return value
        if isinstance(value, str):
            # Замінюємо кому на крапку
            cleaned = value.replace(',', '.')
            try:
                return float(cleaned)
            except:
                return value
        return value
    
    # Очищуємо числові колонки
    for col in numeric_columns:
        if col in df.columns:
            df[col] = df[col].apply(clean_numeric_value)
            # Конвертуємо в числовий тип
            df[col] = pd.to_numeric(df[col], errors='coerce')
    
    # Обробляємо дату
    if 'Date' in df.columns:
        # Якщо дата в форматі з комами (16,08,2014)
        def fix_date_format(date_str):
            if isinstance(date_str, str) and ',' in date_str:
                return date_str.replace(',', '.')
            return date_str
        
        df['Date'] = df['Date'].apply(fix_date_format)
        df['Date'] = pd.to_datetime(df['Date'], format='%d.%m.%Y', errors='coerce')
    
    # Зберігаємо результат
    if output_file.endswith('.xlsx'):
        df.to_excel(output_file, index=False)
    else:
        df.to_csv(output_file, index=False)
    
    print(f"Файл для Power BI збережено: {output_file}")
    
    # Показуємо статистику
    print(f"\nСтатистика файлу:")
    print(f"Кількість записів: {len(df)}")
    print(f"Кількість колонок: {len(df.columns)}")
    
    # Показуємо типи даних
    print(f"\nТипи даних колонок:")
    for col in df.columns:
        print(f"{col}: {df[col].dtype}")
    
    print(f"\nПерші записи:")
    print(df.head(2))

# Використання
if __name__ == "__main__":
    # Шляхи до файлів - ЗАМІНІТЬ НА ВАШІ
    input_file = r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\combined_football_data.csv"
    output_file = r"C:\Users\Nazar\Desktop\Why_football_is_so_popular\powerbi_ready.csv"
    
    print("Виправлення файлу для Power BI")
    print("="*50)
    
    try:
        create_powerbi_ready_file(input_file, output_file)
        print("\n✅ Файл успішно підготовлено для Power BI!")
        print(f"Використовуйте файл: {output_file}")
        
    except Exception as e:
        print(f"❌ Помилка: {e}")
        
        # Якщо є проблеми з Excel, спробуємо CSV
        if input_file.endswith('.xlsx'):
            print("\nСпроба конвертації через CSV...")
            csv_file = input_file.replace('.xlsx', '.csv')
            try:
                df = pd.read_excel(input_file)
                df.to_csv(csv_file, index=False)
                print(f"Створено CSV файл: {csv_file}")
                
                output_csv = output_file.replace('.xlsx', '.csv')
                fix_csv_decimal_separators(csv_file, output_csv)
                print(f"Використовуйте CSV файл: {output_csv}")
                
            except Exception as e2:
                print(f"❌ Помилка з CSV: {e2}")