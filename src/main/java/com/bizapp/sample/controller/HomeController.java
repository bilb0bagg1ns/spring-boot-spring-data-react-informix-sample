package com.bizapp.sample.controller;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bizapp.sample.model.service.BusinessEntityRepositoryService;

@Controller
public class HomeController {

	@Inject
	private BusinessEntityRepositoryService businessEntityRepositoryService;

	@RequestMapping(value = "/")
	public String index() {
		System.out.println("--------> Inside HomeController::index");
		return "index";
	}

	/*-
	@GetMapping("/entityname")
	@Transactional
	public String greeting(@RequestParam(name = "name", required = false, defaultValue = "World") String name,
			Model model) {
		System.out.println("--------> Inside HomeController::greeting");
		System.out.println("--------> name: " + name);
	
	//		List<BusinessEntity> businessEntityList = businessEntityRepositoryService.findByEntityName(name);		
	//		businessEntityList.forEach(System.out::println);
	
		List<BusinessEntity> businessEntityList = businessEntityRepositoryService.findByPartialEntityName(name);
		businessEntityList.forEach(System.out::println);
	
		// model.addAttribute("name", name);
		return "index";
	}
	*/
}
