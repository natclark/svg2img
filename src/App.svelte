<script>
    let element;
    let output;

    let b64 = ``;
    let src = ``;

    const submit = () => {
        b64 = btoa(element);
        src = `data:image/svg+xml;base64,${b64}`;

        output.innerHTML = ``;
        const img = new Image();
        img.src = src;
        output.appendChild(img);
    };
</script>

<section>
    <h1>Convert SVG to IMG</h1>
    <p>I generally prefer using <code>&lt;img&gt;</code> tags instead of <code>&lt;svg&gt;</code> tags.</p>
    <p>This tool easily helps me convert my <code>&lt;svg&gt;</code> elements into <code>&lt;img&gt;</code> format.</p>
    <p><strong>The <code>xmlns="http://www.w3.org/2000/svg"</code> attribute is required, or it won't work.</strong></p>
    <form on:submit|preventDefault={submit}>
        <label class="bold" for="element">SVG Element</label>
        <textarea bind:value={element} id="element" rows="8"></textarea>
        <br>
        <button type="submit">Convert</button>
    </form>
    <div class="container">
        <div>
            <p class="bold">Output (Base64):</p>
            <p><code>{b64}</code></p>
            <p class="bold">Output (Image Tag):</p>
            <p><code>&lt;img src="{src}"&gt;</code></p>
            <p class="bold">Output (Visual):</p>
            <div bind:this={output} class="output"></div>
        </div>
    </div>
</section>

<style>
    section {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        section {
            max-width: none;
        }
    }

    strong {
        color: #f00;
    }

    .bold {
        font-weight: 700;
    }

    .container {
        display: flex;
        justify-content: center;
    }

    .container > div {
        max-width: 500px;
        width: 100%;
    }

    .output {
        border: 2px solid #000;
        border-radius: 4px;
        height: 500px;
    }
</style>
