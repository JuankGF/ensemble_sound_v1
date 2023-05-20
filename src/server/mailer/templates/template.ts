export const template = `<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
      rel="stylesheet"
    />
    <style>
      h1 {
        color: #573065;
      }
      .card {
        position: relative;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        border-radious: 1rem;
      }
      .card-body {
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
        display: flex;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        gap: 0.5rem;
      }
    </style>
  </head>
  <body>
    <div class="card">
    <img src="https://ensemble-sound-v1.vercel.app/_next/image?url=%2Flogo.png&w=256&q=75" alt="logo" />
    <div class="card-body">%BODY%</div>
    </div>
  </body>
</html>`;
