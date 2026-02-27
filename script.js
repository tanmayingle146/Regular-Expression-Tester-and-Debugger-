function testRegex() {
    const text = testText.value;
    const pattern = regexPattern.value;
    const replaceValue = replaceText.value;
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (!pattern) return;

    try {
        let flags = "";
        if (flagG.checked) flags += "g";
        if (flagI.checked) flags += "i";
        if (flagM.checked) flags += "m";

        const regex = new RegExp(pattern, flags);
        const matches = [...text.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"))];

        if (matches.length === 0) {
            results.innerHTML = "<p>No matches found.</p>";
            return;
        }


        
        let highlighted = text;
        let offset = 0;

        matches.forEach(m => {
            const start = m.index + offset;
            const end = start + m[0].length;
            highlighted =
                highlighted.slice(0, start) +
                `<span class="highlight">${m[0]}</span>` +
                highlighted.slice(end);
            offset += `<span class="highlight"></span>`.length;
        });



        let html = `
            <div class="match-box">
                <pre>${highlighted}</pre>
            </div>
        `;

        matches.forEach((m, i) => {
            html += `<div class="match-item">
                <b>Match ${i + 1}:</b> ${m[0]} <br>
                <b>Index:</b> ${m.index}
            `;

            html += "</div>";
        });

        if (replaceValue !== "") {
            html += `
                <div class="match-box">
                    <b>Replaced Output:</b>
                    <pre>${text.replace(regex, replaceValue)}</pre>
                </div>
            `;
        }

        results.innerHTML = html;

    } catch (e) {
        results.innerHTML = `<p style="color:red">${e.message}</p>`;
    }
}

function clearAll() {
    testText.value = "";
    regexPattern.value = "";
    replaceText.value = "";
    results.innerHTML = "";
}

// Extra UI - Features

function toggleLightMode() {
    document.body.classList.toggle("light");
}

function toggleCheatSheet() {
    const modal = document.getElementById("cheatSheet");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
}
