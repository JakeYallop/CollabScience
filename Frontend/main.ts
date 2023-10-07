document.querySelector('.dropbtn')!.addEventListener('click', function () {
    document.getElementById('expertiseDropdown')!.style.display = 'block';
});

document.addEventListener('click', function (e: MouseEvent) {
    if (!document.querySelector('.dropdown')!.contains(e.target as Node)) {
        document.getElementById('expertiseDropdown')!.style.display = 'none';
    }
});
