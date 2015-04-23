package myPackage;
	 
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.interactions.Actions;

import static org.junit.Assert.assertTrue;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.Calendar;
import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Iterator;

	public class testDriver {
		
	    public static void main(String[] args) {
	        // declaration and instantiation of objects/variables

	    	WebDriver driver = new FirefoxDriver();
		String baseUrl = http://54.175.60.221:3000/map	    	

/*
 * 			Corrolator-test-001  -- Bring up the Corrolator site  
 */
	        driver.get(baseUrl);			//Visit the CorrOlator URL
	        
	        String eventDescription = "Beginning test at";
	        printDate(eventDescription);
	        System.out.println("\r\n");	   

//			Wait for it to catch up.  There's a better way to do this -- use WebDriverWait or SeleniumUtil.fluentWait	        
	        try {
            Thread.sleep(2000);                 //FYI - the argument is in milliseconds
	        } catch(InterruptedException ex) {
            Thread.currentThread().interrupt();
	        }	        

	        System.out.println("******* Checking to see if basic page elements are there *******");	 	        
	        
	        String actualTitle = driver.getTitle();
 			if (actualTitle.contentEquals("xxx")){
			    System.out.println("TEST PASSED - Title is correct!");
	         } else {
	 	        System.err.println("TEST FAILED - Title is incorrect.  Expecting XXX.  Received " + actualTitle.toString());
	         }
	        

	        //See if we have a banner section
 			isIdPresent("navbar-main", "Banner", driver);

	        //See if we have a Corrolator image or link       
	        isClassPresent("navbar-brand", "Corrolator buton or Image", driver);

	        //See if we have a US map	        
	        isIdPresent("map", "U.S. Map", driver);

        
//			Show the filter panel
	        driver.findElement(By.xpath("/html/body/div/div[2]/div/div[1]/div[2]/div[1]/div[3]")).click();

/*
* 			Corrolator-test-006 -- Occupation code Drop-down is Correct	        
*/
        
	        System.out.println("\r\n******* Validating Occupation Codes ********");
	        
//			See if the number of occupation code items is correct
	        Select se = new Select(driver.findElement(By.id("empl-picker")));
	        int listSize = 23;
	        String listName = "Occupation Code";
	        checkSizeOfList(se, listSize, "Occupation Code");
	        
//			See if selected occupation codes are present	        
	        List<WebElement> elements=se.getOptions();
	        listName = "Occupation Code";
	        String occupationCode = "All Occupations";
	        checkForOptionInList(elements, listName, occupationCode);

	        occupationCode = "Food Preparation and Serving Related Occupations";
	        checkForOptionInList(elements, listName, occupationCode);	      

	        occupationCode = "Legal Occupations";
	        checkForOptionInList(elements, listName, occupationCode);	
	        
	        occupationCode = "Production Occupations";
	        checkForOptionInList(elements, listName, occupationCode);	

	        occupationCode = "Transportation and Material Moving Occupations";
	        checkForOptionInList(elements, listName, occupationCode);	
	        
/*
* 			Corrolator-test-004 -- Crop Code Drop-down is Correct	        
*/

	        System.out.println("\r\n******* Validating Crop Codes ********");	        
	        
//			See if the number of occupation code items is correct	        
	        se = new Select(driver.findElement(By.id("agr-picker")));
	        listSize = 54;
	        listName = "Crop Code";
	        checkSizeOfList(se, listSize, "listName");	        

//			See if selected occupation codes are present
	        elements=se.getOptions();
	        listName = "Crop Code";
	        String cropCode = "Amaranth";
	        checkForOptionInList(elements, listName, cropCode);
	        
	        cropCode = "Camelina";
	        checkForOptionInList(elements, listName, cropCode);
	        
	        cropCode = "Crambe";
	        checkForOptionInList(elements, listName, cropCode);
	        
	        cropCode = "Guar";
	        checkForOptionInList(elements, listName, cropCode);
	        
	        cropCode = "Millet";
	        checkForOptionInList(elements, listName, cropCode);
	        
	        cropCode = "Triticale";
	        checkForOptionInList(elements, listName, cropCode);
	        
	        cropCode = "Wild Rice";
	        checkForOptionInList(elements, listName, cropCode);
	        
/*
 * 			Corrolator-test-007 -- Select a combo of data points	        
 */

System.out.println("\r\n******* Correlating Occupation Codes with Crop Codes ********");	        

//			Select "Flaxseed and "Farming, Fishing, and Forestry Occupations" 	
	        occupationCode = "Farming, Fishing, and Forestry Occupations";
	        cropCode = "Legumes";
	        driver.findElement(By.id("empl-picker")).sendKeys(occupationCode);
	        driver.findElement(By.id("agr-picker")).sendKeys(cropCode);

//			CLick Correlate        
//			//Not sure we want this to be by xpath but i was getting errors doing by.name btn-primary
//	        driver.findElement(By.xpath("/html/body/div/div[2]/div/div[2]/div/div/button[1]")).click();
	        driver.findElement(By.className("btn-primary")).click();	 
        	System.out.println("TEST PASSED.  Able to correlate " + occupationCode + " with " + cropCode);

/*		COMMENTING FROM HER DOWN OUT FOR NOW - NEEDS VERIFICAITON OF ESRI/LEAFLET
 * 
 */ 
        	
        	
//			Navigate to Minnesota and verify totals
//	        WebElement agData = driver.findElement(By.xpath("xxx"));
//	        WebElement occData = driver.findElement(By.xpath("xxx"));
/*
	        String agProof = "4000";
	        String occProof = "3,530";

	        WebElement state = driver.findElement(By.xpath("/html/body/script[52]"));
	        Actions mouseOver = new Actions(driver);
	        mouseOver.moveToElement(state);
	        // Verify # acres of Flaxseed harvested  
	        assertTrue("Verification Failed: Ag code value is not " + occProof,occProof.equals(driver.findElement(By.xpath("/html/body/div/div[2]/div/div[1]/div[2]/div[2]/div")).getText()));

	        // Verify # employees working in Farming, Fishing,a nd Forestry Occupations  
	        assertTrue("Verification failed: Occupation value is not " + occProof, agProof.equals(driver.findElement(By.id("xxx")).getText()));
	        //  OR //
	        assertTrue("Verification Failed: Occupationn value is not " + occProof,(driver.findElement(By.xpath("xxx")).getText().equalsIgnoreCase(agProof)));

*/

	        System.out.println("\r\n");
	        eventDescription = "Ending test at";
	        printDate(eventDescription);	        
	        
	        //close Firefox
	        driver.close();
	        
	        // exit the program explicitly
	        System.exit(0);
	    }

	    private static void isIdPresent (String elementId, String elementName, WebDriver theDriver) {
	        if(theDriver.findElements(By.id(elementId)).size() != 0){
	        	System.out.println("TEST PASSED. " + elementName + " is Present");
	        	}else{
	        	System.err.println("TEST FAILED. " + elementName + " is Absent");
	        }	    	
	    }

	    private static void isClassPresent (String className, String elementName, WebDriver theDriver) {
	        if(theDriver.findElements(By.className(className)).size() != 0){
	        	System.out.println("TEST PASSED " + elementName + " is Present");
	        	}else{
	        		System.err.println("TEST FAILED " +  elementName + " is Absent");
	        }	    	
	    }	    
	    
	    private static void checkSizeOfList(Select list, int expectedSize, String listName) {
	        int numOptions = list.getOptions().size();
	        if (numOptions == expectedSize) { 
	        	System.out.println("TEST PASSED. " + listName + " drop down is populated correctly");
	        	}else{
	        		System.err.println("TEST FAILED. Inccorrect number of entries in " + listName + " drop down.  " + numOptions + " found.  Expecting " + expectedSize);
	        	}	    	
	    }
	    
        private static void checkForOptionInList(List<WebElement> elements, String nameOfList, String optionName) {
        Iterator<WebElement> itr = elements.iterator();
        boolean found=false;
        while (itr.hasNext()) {
        	WebElement row = itr.next();
        	if (row.getText().equalsIgnoreCase(optionName)) {
        		found=true;
    	        System.out.println("TEST PASSED.  Found " + optionName + " in the " + nameOfList + " drop down");
    	        break;
        	}
    	}
        if (!found) {
        	System.err.println("TEST FAILED.  Did not find " + optionName + " in the " + nameOfList + " drop down");
        }
        }
    
        private static void printDate(String eventDesc) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
       	Calendar cal = Calendar.getInstance();
    	System.out.println("******* " + eventDesc + " " + dateFormat.format(cal.getTime()));
    }
        
}