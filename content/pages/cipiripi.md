---
title: Prevodilac na cipiripinski
slug: cipiripi
date: 2013-02-03
category: static
status: published
---
<center>
    <img src='images/cipiripi.png' />
    <br />
    <div id='result'></div>
    <textarea type='text' id='tekst_polje' size='150'  cols='40' rows='4'></textarea>
    <br />
    <button id="convert">Konvertuj u cipiripinski!</button>
</center>

<script>
    convert.onclick = () => {
        let tekst = tekst_polje.value;
        let vowels = ['a', 'e', 'i', 'o', 'u'];
        let change = letter => { tekst = tekst.replaceAll(letter, 'i').replaceAll(letter.toUpperCase(), 'I'); }
        vowels.map(change);
        result.innerHTML = "<b>Prevedeni tekst:</b> <p>"+ tekst +"</p> <br/> <b>Originalni tekst:</b><p>"+ tekst_polje.value +"</p>";
    }
</script>
