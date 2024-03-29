en

## Modeled in Blender
## Render whith Three.js [https://threejs.org](https://threejs.org)
## glTFView (c) João Sousa 2021

This module insert a (gltf or glb) file in web page, add a shadow to the object and create a "RoomEnvironment" (light). Just add a tag width class **glTFView** and insert the properties.

Attributes:

*  **glTFfile="&lt;path&gt;":** path to file 3d.

*  **auto:** if present the object auto rotate.
 
*  **w="&lt;int&gt;":** canvas width, if not present use window width.
 
*  **h="&lt;int&gt;":** canvas height.
 
*  **zoom:** if present enable zoom (mouse wheel) .
 
*  **transparent:** if present remove canvas background but remove also the shadow.
 
*  **bg="&lt;#hex&gt;":** define background color. (if not present default is white)

*  **scale="&lt;float&gt;":** define scale. (if not present default 1.0)

*  **ld="&lt;#hex&gt;":** loading wheel color.

Example:

`<div class="glTFView" glTFfile="models/model.gltf" auto zoom w="300" h="300"></div> `

[Demo](https://joaosousa1.github.io/glTFView/)

[Demo 2](https://joaosousa1.github.io/glTFView/test.html)

---
pt

## Modelado no Blender
## Renderizado com Three.js [https://threejs.org](https://threejs.org)
## glTFView (c) João Sousa 2021


Este modulo carrega um ficheiro 3D (gltf ou glb), adiciona ao canvas um cursor grabbing para rodar o obcjeto, coloca uma sombra no modelo, e cria um "RoomEnvironment". Basta definir uma tag com a classe de **glTFView** e adicionar as propriedades.

Atributos da tag:

*  **glTFfile="&lt;caminho&gt;":** caminho para o ficheiro 3d.

*  **auto:** se presente o ficheiro roda automaticamente.
 
*  **w="&lt;int&gt;":** largura do canvas, se omitir é redimensionado de acordo com a largura da janela.
 
*  **h="&lt;int&gt;":** altura do canvas.
 
*  **zoom:** se presente, permite utilizar o zoom com o mouse whell.
 
*  **transparent:** se presente, o fundo do canvas fica transparente mas não é possível adicionar uma sombra.
 
*  **bg="&lt;#hex&gt;":** define a cor do background (esta opção é ignorada quando usado a opção "transparent"), e quando não é definida por omissão a cor de background é branco

*  **scale="&lt;float&gt;":** define tamanho. (se não estiver presente o default é 1.0)

*  **ld="&lt;#hex&gt;":** define a cor da borda do loading.

Exemplo:

`<div class="glTFView" glTFfile="models/model.gltf" auto zoom w="300" h="300"></div> `

[Demo](https://joaosousa1.github.io/glTFView/)

[Demo 2](https://joaosousa1.github.io/glTFView/test.html)