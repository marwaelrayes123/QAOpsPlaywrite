const ExcelJs = require('exceljs')
const {test, expect} = require('@playwright/test');


async function writeExcelTest(searchText,replacedText,change, filePath) {

    
const workbook = new ExcelJs.Workbook()

await workbook.xlsx.readFile(filePath)
const workSheet = workbook.getWorksheet('Sheet1')

let outVar = await readExcel(workSheet,searchText,change)

  if (outVar.rowS === -1 || outVar.columnS === -1) {
    console.log(`"${searchText}" not found`)
    return
  }

  const cell = workSheet.getCell(outVar.rowS,outVar.columnS+change.colChange);
  cell.value = replacedText
  await workbook.xlsx.writeFile(filePath)
}

async function readExcel(workSheet,searchText) {
    let outVar ={rowS:-1,columnS:-1}
workSheet.eachRow((row,rowNumber)=> {

    row.eachCell((cell,cellNumber)=> {

       if(cell.value?.toString().trim()  ===searchText) {
        console.log("---there is a banana----")
        outVar.rowS =rowNumber;
         outVar.columnS = cellNumber;
       
       }
    }

    )


})
return outVar
}


test('Upload download excel validation ', async ({page})=> 
{

const textSearch = 'Mango'
const updateValue='350'
  
 await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
 const downloadPromise = page.waitForEvent('download')

 await page.locator("#downloadButton").click()

const download = await downloadPromise
await download.saveAs('download.xlsx')

await writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"download.xlsx")

 await page.locator("#fileinput").click()
 await page.locator("#fileinput").setInputFiles("download.xlsx")

 const textLocator = page.getByText(textSearch)
const desiredRow =  page.getByRole('row').filter({has:textLocator})


await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue)



});
