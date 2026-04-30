import os

root_dir = r'i:\next-trimulyo\app'
replacements = {
    'kecamatan': 'kapanewon',
    'Kecamatan': 'Kapanewon',
    'desa': 'kalurahan',
    'Desa': 'Kalurahan',
    'APBDes': 'APBKAL',
    'apbdes': 'apbkal'
}

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.js', '.jsx', '.json')):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                for old, new in replacements.items():
                    new_content = new_content.replace(old, new)
                
                if content != new_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated: {file_path}")
            except Exception as e:
                print(f"Error processing {file_path}: {e}")
